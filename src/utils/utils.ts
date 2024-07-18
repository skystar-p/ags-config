import Gdk from "gi://Gdk";
import GLib from "gi://GLib?version=2.0";
import Gtk from "gi://Gtk?version=3.0";

export function forMonitors(widget: (monitor: number) => Gtk.Window) {
  const n = Gdk.Display.get_default()?.get_n_monitors() || 1;
  return [...Array(n).keys()].map(widget);
}
