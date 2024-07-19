import options from "options";

const { interval } = options.cpu;

class CPU extends Service {
  static {
    Service.register(this, {}, {
      "usage": ["double", "r"],
    });
  }

  async updateUsage() {
    let res = await Utils.execAsync([
      "bash",
      "-c",
      `awk '{u=$2+$4; t=$2+$4+$5; if (NR==1){u1=u; t1=t} else printf("%.2f", (u-u1) * 100 / (t-t1))}' <(grep 'cpu ' /proc/stat) <(sleep 1; grep 'cpu ' /proc/stat)`,
    ]);
    this.#currentUsage = Number(res);
  }

  #currentUsage: number | null = null;

  get usage() {
    if (this.#currentUsage == null) {
      return 0.0;
    }

    return this.#currentUsage;
  }

  constructor() {
    super();

    if (interval.value <= 0) {
      return this;
    }

    this.notify("ncores");

    Utils.interval(interval.value, () => {
      this.updateUsage();
      this.notify("usage");
    });
  }
}

export default new CPU();
