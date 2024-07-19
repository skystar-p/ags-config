import memory from "services/memory";
import icons from "utils/icons";

export default () => {
  return Widget.Box({
    css: "padding: 4px",
    children: [
      Widget.Icon({
        css: "margin-right: 4px",
        icon: icons.system.memory,
      }),
      Widget.Label({
        css: "font-size: 0.85em",
        class_name: "memory",
        label: memory.bind("usage_kb").as(v => `${(v / 1024 / 1024).toFixed(1)} GB`),
      }),
    ],
  });
};
