import { botCommand, botPlugin } from "../Context";

export = class Plugin {
    public name: string;
    public desc: string;
    public enabled: boolean;
    public commands: botCommand[];
    constructor(options: botPlugin) {
        this.name = options.name;
        this.desc = options.desc;
        this.enabled = options.enabled;
        this.commands = options.commands;
    }
}