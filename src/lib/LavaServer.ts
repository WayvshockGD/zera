import { Manager, ManagerOptions } from "erela.js";
import Config from "../Config";

let { config } = Config();

export = class LavaServer extends Manager {
    constructor(options: ManagerOptions) {
        super(options);
    }

    public stopSong(guild: string) {
        let res = this.get(guild);
        if (!res) return false;
        return res.stop();
    }
}