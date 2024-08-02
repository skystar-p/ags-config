import options from "options";

const { interval } = options.networkctl;

const filterOut = [
  "no-carrier",
  "degraded-carrier",
  "configuring",
  "dormant",
  "off",
  "missing",
  "pending",
  "failed",
];

class NetworkCtl extends Service {
  static {
    Service.register(this, {}, {
      "status": ["string", "r"],
    });
  }

  #status: "wired" | "wireless" | "disconnected" = "disconnected";

  async updateStatus() {
    // use networkctl
    let output = await Utils.execAsync(["networkctl", "list"]);

    // split with line
    let lines = output.split("\n")
      .filter(line => line.includes("ether") || line.includes("wlan"))
      .filter(line => !filterOut.some(filter => line.includes(filter)))
      .filter(line => line.includes("routable") || line.includes("carrier"));

    if (lines.length === 0) {
      this.#status = "disconnected";
      return;
    }

    // find ether first
    let wired = lines.find(line => line.includes("ether"));
    if (wired) {
      this.#status = "wired";
      return;
    }

    // find wlan
    let wireless = lines.find(line => line.includes("wlan"));
    if (wireless) {
      this.#status = "wireless";
      return;
    }

    this.#status = "disconnected";
  }

  get status(): "wired" | "wireless" | "disconnected" {
    return this.#status;
  }

  constructor() {
    super();

    if (interval.value <= 0) {
      return this;
    }

    Utils.interval(interval.value, () => {
      this.updateStatus().then(() => this.notify("status"));
    });
  }
}

export default new NetworkCtl();
