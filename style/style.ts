const options = {
  theme: {
    dark: {
      primary: {
        bg: "#51a4e7",
        fg: "#141414",
      },
      error: {
        bg: "#e55f86",
        fg: "#141414",
      },
      bg: "#171717",
      fg: "#eeeeee",
      widget: "#eeeeee",
      border: "#eeeeee",
    },
    light: {
      primary: {
        bg: "#426ede",
        fg: "#eeeeee",
      },
      error: {
        bg: "#b13558",
        fg: "#eeeeee",
      },
      bg: "#fffffa",
      fg: "#080808",
      widget: "#080808",
      border: "#080808",
    },

    blur: 0,
    scheme: <"dark" | "light"> ("dark"),
    widget: { opacity: 94 },
    border: {
      width: 1,
      opacity: 96,
    },

    shadows: true,
    padding: 7,
    spacing: 12,
    radius: 11,
  },

  transition: 200,

  font: {
    size: 13,
    name: "Mononoki Nerd Font",
  },

  bar: {
    battery: {
      charging: "#00D787",
      blocks: 7,
    },
    corners: 50,
    position: "regular",
  },

  hyprland: {
    gaps: 2.4,
  },
};

const {
  dark,
  light,
  blur,
  scheme,
  padding,
  spacing,
  radius,
  shadows,
  widget,
  border,
} = options.theme;

const popoverPaddingMultiplier = 1.6;

const t = (dark: string, light: string) => scheme === "dark" ? `${dark}` : `${light}`;

const $ = (name: string, value: string) => `$${name}: ${value};`;

export const variables = () => [
  $("bg", `transparentize(${t(dark.bg, light.bg)}, ${blur / 100})`),
  $("fg", t(dark.fg, light.fg)),

  $("primary-bg", t(dark.primary.bg, light.primary.bg)),
  $("primary-fg", t(dark.primary.fg, light.primary.fg)),

  $("error-bg", t(dark.error.bg, light.error.bg)),
  $("error-fg", t(dark.error.fg, light.error.fg)),

  $("scheme", scheme),
  $("padding", `${padding}pt`),
  $("spacing", `${spacing}pt`),
  $("radius", `${radius}px`),
  $("transition", `${options.transition}ms`),

  $("shadows", `${shadows}`),

  $("widget-bg", `transparentize(${t(dark.widget, light.widget)}, ${widget.opacity / 100})`),

  $("hover-bg", `transparentize(${t(dark.widget, light.widget)}, ${(widget.opacity * .9) / 100})`),
  $("hover-fg", `lighten(${t(dark.fg, light.fg)}, 8%)`),

  $("border-width", `${border.width}px`),
  $("border-color", `transparentize(${t(dark.border, light.border)}, ${border.opacity / 100})`),
  $("border", "$border-width solid $border-color"),

  $(
    "active-gradient",
    `linear-gradient(to right, ${t(dark.primary.bg, light.primary.bg)}, darken(${
      t(dark.primary.bg, light.primary.bg)
    }, 4%))`,
  ),
  $("shadow-color", t("rgba(0,0,0,.6)", "rgba(0,0,0,.4)")),
  $("text-shadow", t("2pt 2pt 2pt $shadow-color", "none")),
  $("box-shadow", t("2pt 2pt 2pt 0 $shadow-color, inset 0 0 0 $border-width $border-color", "none")),

  $(
    "popover-border-color",
    `transparentize(${t(dark.border, light.border)}, ${Math.max((border.opacity - 1) / 100, 0)})`,
  ),
  $("popover-padding", `$padding * ${popoverPaddingMultiplier}`),
  $("popover-radius", radius === 0 ? "0" : "$radius + $popover-padding"),

  $("font-size", `${options.font.size}pt`),
  $("font-name", options.font.name),

  $("charging-bg", `${options.bar.battery.charging}`),
  $("bar-battery-blocks", `${options.bar.battery.blocks}`),
  $("bar-position", options.bar.position),
  $("hyprland-gaps-multiplier", `${options.hyprland.gaps}`),
  $("screen-corner-multiplier", `${options.bar.corners * 0.01}`),
];

/*
async function resetCss() {
  if (!dependencies("sass", "fd")) {
    return;
  }

  try {
    const vars = `${TMP}/variables.scss`;
    const scss = `${TMP}/main.scss`;
    const css = `${TMP}/main.css`;

    const fd = await bash(`fd ".scss" ${App.configDir}`);
    const files = fd.split(/\s+/);
    const imports = [vars, ...files].map(f => `@import '${f}';`);

    await Utils.writeFile(variables().join("\n"), vars);
    await Utils.writeFile(imports.join("\n"), scss);
    await bash`sass ${scss} ${css}`;

    App.applyCss(css, true);
  } catch (error) {
    error instanceof Error
      ? logError(error)
      : console.error(error);
  }
}
*/

/*
Utils.monitorFile(`${App.configDir}/style`, resetCss);
options.handler(deps, resetCss);
await resetCss();
*/
