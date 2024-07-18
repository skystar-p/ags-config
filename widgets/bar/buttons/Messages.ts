import icons from "utils/icons";
import PanelButton from "../PanelButton";

const n = await Service.import("notifications");
const notifs = n.bind("notifications");
const action = () => App.toggleWindow("datemenu");

export default () =>
  PanelButton({
    class_name: "messages",
    on_clicked: action,
    visible: notifs.as(n => n.length > 0),
    child: Widget.Box([
      Widget.Icon(icons.notifications.message),
    ]),
  });
