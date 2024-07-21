import memory from "services/memory";
import icons from "utils/icons";
import PanelButton from "./bar/PanelButton";

export default () => {
  return PanelButton({
    css: "padding: 4px",
    class_name: "memory",
    child: Widget.Box([
      Widget.Icon({
        css: "margin-right: 4px",
        icon: icons.system.memory,
      }),
      Widget.Label({
        css: "font-size: 0.85em",
        label: memory.bind("usage_kb").as(v => `${(v / 1024 / 1024).toFixed(1)} GB`),
      }),
    ]),
  });
};
