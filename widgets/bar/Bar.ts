import options from "options";
import CPUUsage from "widgets/CPUUsage";
import MemoryUsage from "widgets/MemoryUsage";
import BatteryBar from "./buttons/BatteryBar";
import Date from "./buttons/Date";
import Messages from "./buttons/Messages";
import SystemIndicators from "./buttons/SystemIndicators";
import SysTray from "./buttons/SysTray";
import Workspaces from "./buttons/Workspaces";

const { start, center, end } = options.bar.layout;
const { transparent, position } = options.bar;

export type BarWidget = keyof typeof widget;

const widget = {
  battery: BatteryBar,
  date: Date,
  systray: SysTray,
  system: SystemIndicators,
  workspaces: Workspaces,
  messages: Messages,
  cpu: CPUUsage,
  memory: MemoryUsage,
  expander: () => Widget.Box({ expand: true }),
};

export default (monitor: number) =>
  Widget.Window({
    monitor,
    class_name: "bar",
    name: `bar${monitor}`,
    exclusivity: "exclusive",
    anchor: position.bind().as(pos => [pos, "right", "left"]),
    child: Widget.CenterBox({
      css: "min-width: 2px; min-height: 2px;",
      startWidget: Widget.Box({
        hexpand: true,
        children: start.bind().as(ws => ws.map(w => widget[w]())),
      }),
      centerWidget: Widget.Box({
        hpack: "center",
        children: center.bind().as(ws => ws.map(w => widget[w]())),
      }),
      endWidget: Widget.Box({
        hexpand: true,
        hpack: "end",
        children: end.bind().as(ws => ws.map(w => widget[w]())),
      }),
    }),
    setup: self =>
      self.hook(transparent, () => {
        self.toggleClassName("transparent", transparent.value);
      }),
  });
