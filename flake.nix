{
  description = "ags";

  inputs = {
    ags.url = "github:skystar-p/ags/skystar";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    swww.url = "github:LGFae/swww";
  };

  outputs = { nixpkgs, flake-utils, swww, ... }@inputs: flake-utils.lib.eachDefaultSystem (system:
    let
      pkgs = import nixpkgs { inherit system; };
      swww-git = swww.packages.${system}.swww;
    in
    {
      packages = {
        default = (pkgs.callPackage (import ./default.nix) { inherit inputs; swww = swww-git; });
      };
      devShell = pkgs.mkShell {
        buildInputs = with pkgs; [
          nodejs
          pnpm
          esbuild
          dprint
          dart-sass
          brightnessctl
          matugen
        ];
      };
    }
  );
}
