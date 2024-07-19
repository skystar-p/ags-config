import options from "options";
import { clock } from "utils/variables";
import PanelButton from "../PanelButton";

const { format, action } = options.bar.date;
const time = Utils.derive([clock, format], (c, f) => c.format(f) || "");

export default () =>
  PanelButton({
    window: "datemenu",
    on_clicked: action.bind(),
    child: Widget.Label({
      justification: "center",
      label: time.bind(),
    }),
  });
