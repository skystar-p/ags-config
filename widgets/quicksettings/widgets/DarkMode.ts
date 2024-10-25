import options from "options";
import icons from "utils/icons";
import { SimpleToggleButton } from "../ToggleButton";

const { scheme } = options.theme;

export const DarkModeToggle = () =>
  SimpleToggleButton({
    icon: scheme.bind().as(s => icons.color[s]),
    label: scheme.bind().as(s => s === "dark" ? "Dark" : "Light"),
    toggle: () => scheme.value = scheme.value === "dark" ? "light" : "dark",
    connection: [scheme, () => scheme.value === "dark"],
  });
