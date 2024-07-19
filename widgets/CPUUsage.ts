import cpu from "services/cpu";
import icons from "utils/icons";

export default () => {
  return Widget.Box({
    css: "padding: 4px",
    children: [
      Widget.Icon({
        css: "margin-right: 4px",
        icon: icons.system.cpu,
      }),
      Widget.Label({
        css: "font-size: 0.85em",
        class_name: "cpu",
        label: cpu.bind("usage").as(v => `${v.toFixed(1)}%`),
      }),
    ],
  });
};
