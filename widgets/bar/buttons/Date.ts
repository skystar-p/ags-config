import GLib from "gi://GLib";
import PanelButton from "../PanelButton";

const clock = Variable(GLib.DateTime.new_now_local(), {
  poll: [1000, () => GLib.DateTime.new_now_local()],
});

const format = Variable("%I:%M %p");
const time = Utils.derive([clock, format], (c, f) => c.format(f) || "");
const action = () => App.toggleWindow("datemenu");

export default () =>
  PanelButton({
    window: "datemenu",
    on_clicked: action,
    child: Widget.Label({
      justification: "center",
      label: time.bind(),
    }),
  });
