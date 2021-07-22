import { Manager, ManagerOptions } from "erela.js";
import FilterManager from "erela.js-filters";

export = class LavaServer extends Manager {
    constructor(options: ManagerOptions) {
        super({
            ...options,
            plugins: [ new FilterManager() ]
        });
    }
}