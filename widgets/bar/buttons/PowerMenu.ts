import options from "options";
import icons from "utils/icons";
import PanelButton from "../PanelButton";

const { monochrome, action } = options.bar.powermenu;

export default () =>
  PanelButton({
    window: "powermenu",
    on_clicked: action.bind(),
    child: Widget.Icon(icons.powermenu.shutdown),
    setup: self =>
      self.hook(monochrome, () => {
        self.toggleClassName("colored", !monochrome.value);
        self.toggleClassName("box");
      }),
  });
