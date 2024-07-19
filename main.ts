import "utils/session";
import "style/style";
import options from "options";
import init from "utils/init";
import { forMonitors } from "utils/utils";
import Bar from "widgets/bar/Bar";
import ScreenCorners from "widgets/bar/ScreenCorners";
import { setupDateMenu } from "widgets/datemenu/DateMenu";
import NotificationPopups from "widgets/notifications/NotificationPopups";
// import OSD from "widgets/osd/OSD";
import Overview from "widgets/overview/Overview";
// import PowerMenu from "widgets/powermenu/PowerMenu";
import Verification from "widgets/powermenu/Verification";
import { setupQuickSettings } from "widgets/quicksettings/QuickSettings";
import SettingsDialog from "widgets/settings/SettingsDialog";

App.config({
  onConfigParsed: () => {
    setupQuickSettings();
    setupDateMenu();
    init();
  },
  closeWindowDelay: {
    "overview": options.transition.value,
    "quicksettings": options.transition.value,
    "datemenu": options.transition.value,
  },
  windows: () => [
    ...forMonitors(Bar),
    ...forMonitors(NotificationPopups),
    ...forMonitors(ScreenCorners),
    // ...forMonitors(OSD),
    Overview(),
    // PowerMenu(),
    SettingsDialog(),
    Verification(),
  ],
});
