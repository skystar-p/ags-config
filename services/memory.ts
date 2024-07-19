import options from "options";

const { interval } = options.memory;

class Memory extends Service {
  static {
    Service.register(this, {}, {
      "usage-kb": ["int", "r"],
    });
  }

  async updateUsage() {
    let res = await Utils.execAsync([
      "bash",
      "-c",
      `awk '/MemTotal/ {total=$2} /MemAvailable/ {available=$2} END {print total-available}' /proc/meminfo`,
    ]);
    this.#currentUsage = Number(res);
  }

  #currentUsage: number | null = null;

  get usage_kb() {
    if (this.#currentUsage == null) {
      return 0;
    }

    return this.#currentUsage;
  }

  constructor() {
    super();

    if (interval.value <= 0) {
      return this;
    }

    Utils.interval(interval.value, () => {
      this.updateUsage();
      this.notify("usage-kb");
    });
  }
}

export default new Memory();
