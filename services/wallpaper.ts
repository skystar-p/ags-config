import { dependencies, sh } from "utils/utils";

export type Resolution = 1920 | 1366 | 3840;
export type Market =
  | "random"
  | "en-US"
  | "ja-JP"
  | "en-AU"
  | "en-GB"
  | "de-DE"
  | "en-NZ"
  | "en-CA";

const WP = `${Utils.HOME}/private/wallpapers/current_wallpaper`;

class Wallpaper extends Service {
  static {
    Service.register(this, {}, {
      "wallpaper": ["string"],
    });
  }

  #blockMonitor = false;

  #wallpaper() {
    if (!dependencies("swww")) {
      return;
    }

    sh("hyprctl cursorpos").then(pos => {
      sh([
        "swww",
        "img",
        "--resize",
        "fit",
        "--invert-y",
        "--transition-type",
        "grow",
        "--transition-pos",
        pos.replace(" ", ""),
        WP,
      ]).then(() => {
        this.changed("wallpaper");
      });
    });
  }

  async #setWallpaper(path: string) {
    this.#blockMonitor = true;

    await sh(`cp ${path} ${WP}`);
    this.#wallpaper();

    this.#blockMonitor = false;
  }

  readonly set = (path: string) => {
    this.#setWallpaper(path);
  };

  get wallpaper() {
    return WP;
  }

  constructor() {
    super();

    if (!dependencies("swww")) {
      return this;
    }

    // gtk portal
    Utils.monitorFile(WP, () => {
      if (!this.#blockMonitor) {
        this.#wallpaper();
      }
    });

    Utils.execAsync("swww-daemon")
      .then(this.#wallpaper)
      .catch(() => null);
  }
}

export default new Wallpaper();
