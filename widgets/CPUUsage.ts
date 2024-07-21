import cpu from "services/cpu";
import icons from "utils/icons";
import PanelButton from "./bar/PanelButton";

export default () => {
  return PanelButton({
    class_name: "cpu",
    css: "padding: 4px",
    child: Widget.Box([
      Widget.Icon({
        css: "margin-right: 4px",
        icon: icons.system.cpu,
      }),
      Widget.Label({
        css: "font-size: 0.85em",
        label: cpu.bind("usage").as(v => `${v.toFixed(1)}%`),
      }),
    ]),
  });
};
