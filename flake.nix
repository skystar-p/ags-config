{
  description = "ags";

  inputs = {
    ags.url = "github:skystar-p/ags/skystar";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { nixpkgs, flake-utils, ... }@inputs: flake-utils.lib.eachDefaultSystem (system:
    let
      pkgs = import nixpkgs { inherit system; };
    in
    {
      packages = {
        default = (pkgs.callPackage (import ./default.nix) { inherit inputs; });
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
