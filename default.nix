{ inputs
, stdenv
, esbuild
, system
, dart-sass
, brightnessctl
, matugen
, swww
, pavucontrol
, gtk3
, writeShellScript
}:

let
  name = "ags-config";

  ags = inputs.ags.packages.${system}.default;

  dependencies = [
    ags
    inputs.ags.packages.${system}.default
    dart-sass
    brightnessctl
    swww
    matugen
    pavucontrol
    gtk3
  ];

  addBins = list: builtins.concatStringsSep ":" (builtins.map (p: "${p}/bin") list);

  desktop = writeShellScript name ''
    export PATH=$PATH:${addBins dependencies}
    ${ags}/bin/ags -b ${name} -c ${config}/config.js $@
  '';

  config = stdenv.mkDerivation {
    inherit name;
    src = ./.;

    buildPhase = ''
      ${esbuild}/bin/esbuild \
        --bundle ./main.ts \
        --outfile=main.js \
        --format=esm \
        --external:resource://\* \
        --external:gi://\* \
    '';

    installPhase = ''
      mkdir -p $out
      cp -r assets $out
      cp -r style $out
      cp -r widgets $out
      cp -f main.js $out/config.js
    '';
  };
in
stdenv.mkDerivation {
  inherit name;
  src = config;

  installPhase = ''
    mkdir -p $out/bin
    cp -r . $out
    cp ${desktop} $out/bin/${name}
  '';
}
