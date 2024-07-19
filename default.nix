{ stdenv
, esbuild
}:
let
  name = "ags-config";

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
  '';
}
