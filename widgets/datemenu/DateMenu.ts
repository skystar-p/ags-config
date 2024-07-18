import PopupWindow from "widgets/PopupWindow";
import DateColumn from "./DateColumn";
import NotificationColumn from "./NotificationColumn";

const pos = Variable("top");
const datemenuPos = Variable("center");
const layout = Utils.derive([pos, datemenuPos], (bar, qs) => `${bar}-${qs}` as const);

const Settings = () =>
  Widget.Box({
    class_name: "datemenu horizontal",
    vexpand: false,
    children: [
      NotificationColumn(),
      Widget.Separator({ orientation: 1 }),
      DateColumn(),
    ],
  });

const DateMenu = () =>
  PopupWindow({
    name: "datemenu",
    exclusivity: "exclusive",
    transition: pos.bind().as(pos => pos === "top" ? "slide_down" : "slide_up"),
    // @ts-ignore
    layout: layout.value,
    child: Settings(),
  });

export function setupDateMenu() {
  App.addWindow(DateMenu());
  layout.connect("changed", () => {
    App.removeWindow("datemenu");
    App.addWindow(DateMenu());
  });
}
