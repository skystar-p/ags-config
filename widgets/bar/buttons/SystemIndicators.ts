import networkctl from "services/networkctl";
import icons from "utils/icons";
import PanelButton from "../PanelButton";

const notifications = await Service.import("notifications");
const bluetooth = await Service.import("bluetooth");
const audio = await Service.import("audio");

const MicrophoneIndicator = () =>
  Widget.Icon()
    .hook(audio, self =>
      self.visible = audio.recorders.length > 0
        || audio.microphone.is_muted
        || false)
    .hook(audio.microphone, self => {
      const vol = audio.microphone.is_muted ? 0 : audio.microphone.volume;
      const { muted, low, medium, high } = icons.audio.mic;
      const cons = [[67, high], [34, medium], [1, low], [0, muted]] as const;
      self.icon = cons.find(([n]) => n <= vol * 100)?.[1] || "";
    });

const DNDIndicator = () =>
  Widget.Icon({
    visible: notifications.bind("dnd"),
    icon: icons.notifications.silent,
  });

const BluetoothIndicator = () =>
  Widget.Overlay({
    class_name: "bluetooth",
    passThrough: true,
    visible: bluetooth.bind("enabled"),
    child: Widget.Icon({
      icon: icons.bluetooth.enabled,
    }),
    overlay: Widget.Label({
      hpack: "end",
      vpack: "start",
      label: bluetooth.bind("connected_devices").as(c => `${c.length}`),
      visible: bluetooth.bind("connected_devices").as(c => c.length > 0),
    }),
  });

const NetworkIndicatorV2 = () =>
  Widget.Icon({
    icon: networkctl.bind("status").as(status => {
      switch (status) {
        case "wired":
          return "network-wired-symbolic";
        case "wireless":
          return "network-wireless-signal-excellent-symbolic";
        default:
          return "network-wireless-signal-none-symbolic";
      }
    }),
  });

const AudioIndicator = () =>
  Widget.Icon()
    .hook(audio.speaker, self => {
      const vol = audio.speaker.is_muted ? 0 : audio.speaker.volume;
      const { muted, low, medium, high, overamplified } = icons.audio.volume;
      const cons = [[101, overamplified], [67, high], [34, medium], [1, low], [0, muted]] as const;
      self.icon = cons.find(([n]) => n <= vol * 100)?.[1] || "";
    });

export default () =>
  PanelButton({
    window: "quicksettings",
    on_clicked: () => App.toggleWindow("quicksettings"),
    on_scroll_up: () => audio.speaker.volume += 0.02,
    on_scroll_down: () => audio.speaker.volume -= 0.02,
    child: Widget.Box([
      DNDIndicator(),
      BluetoothIndicator(),
      NetworkIndicatorV2(),
      AudioIndicator(),
      MicrophoneIndicator(),
    ]),
  });
