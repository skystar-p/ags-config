import { forMonitors } from "utils/utils";
import Bar from "widgets/bar/Bar";
import { setupDateMenu } from "widgets/datemenu/DateMenu";
import { setupQuickSettings } from "widgets/quicksettings/QuickSettings";

// const time = Variable("", {
//   poll: [1000, function() {
//     return Date().toString();
//   }],
// });

// const Bar = (/** @type {number} */ monitor) =>
//   Widget.Window({
//     monitor,
//     name: `bar${monitor}`,
//     anchor: ["top", "left", "right"],
//     exclusivity: "exclusive",
//     child: Widget.CenterBox({
//       start_widget: Widget.Label({
//         hpack: "center",
//         label: "Welcome to AGS!",
//       }),
//       end_widget: Widget.Label({
//         hpack: "center",
//         label: time.bind(),
//       }),
//     }),
//   });

App.config({
  onConfigParsed: () => {
    setupQuickSettings();
    setupDateMenu();
  },

  style: "./main.css",
  windows: forMonitors(Bar),
});
