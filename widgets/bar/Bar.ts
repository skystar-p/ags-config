import BatteryBar from "./buttons/BatteryBar";
import ColorPicker from "./buttons/ColorPicker";
import Date from "./buttons/Date";
import Launcher from "./buttons/Launcher";
import Media from "./buttons/Media";
import Messages from "./buttons/Messages";
import PowerMenu from "./buttons/PowerMenu";
import ScreenRecord from "./buttons/ScreenRecord";
import SystemIndicators from "./buttons/SystemIndicators";
import SysTray from "./buttons/SysTray";
import Taskbar from "./buttons/Taskbar";
import Workspaces from "./buttons/Workspaces";

const startWidget: Array<BarWidget> = [
  "workspaces",
];

const centerWidget: Array<BarWidget> = [
  "date",
];

const endWidget: Array<BarWidget> = [
  "systray",
];

export type BarWidget = keyof typeof widget;

const widget = {
  // battery: BatteryBar,
  // colorpicker: ColorPicker,
  date: Date,
  // launcher: Launcher,
  // media: Media,
  // powermenu: PowerMenu,
  systray: SysTray,
  // system: SystemIndicators,
  // taskbar: Taskbar,
  workspaces: Workspaces,
  // screenrecord: ScreenRecord,
  messages: Messages,
  // expander: () => Widget.Box({ expand: true }),
};

export default (monitor: number) =>
  Widget.Window({
    monitor,
    class_name: "bar",
    name: `bar${monitor}`,
    exclusivity: "exclusive",
    anchor: ["top", "left", "right"],
    child: Widget.CenterBox({
      css: "min-width: 2px; min-height: 2px;",
      startWidget: Widget.Box({
        hexpand: true,
        children: startWidget.map(w => widget[w]()),
      }),
      centerWidget: Widget.Box({
        hpack: "center",
        children: centerWidget.map(w => widget[w]()),
      }),
      endWidget: Widget.Box({
        hpack: "end",
        hexpand: true,
        children: endWidget.map(w => widget[w]()),
      }),
    }),
    setup: self => self.toggleClassName("transparent", true),
  });
