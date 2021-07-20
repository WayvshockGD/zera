import Eris = require("eris");
import { botCommand, botPlugin, botSubCommand, colors } from "../Context";
import TestManager = require("../managers/TestManager");
import Logger = require("../util/Logger");
import CommandHandler = require("./handlers/CommandHandler");
import LoadPlugins = require("./LoadPlugins");
import tyr from "@thesharks/tyr/dist/eris";
import Config = require("../Config");

let { config } = Config();

export = class Zera extends Eris.Client {
    commands = new Map<string, botCommand>();
    plugins = new Map<string, botPlugin>();
    subCommands = new Map<string, botSubCommand>();
    logger: Logger = new Logger();
    player: tyr.ErisPlayerManager;
    
    constructor(options: Eris.ClientOptions) {
        super(TestManager.token, options);

        LoadPlugins({
            commands: this.commands,
            plugins: this.plugins,
            subCommands: this.subCommands
        });

        this.player = new tyr.ErisPlayerManager([
            {
                host: config.lavalink.host,
                port: config.lavalink.port,
                password: config.lavalink.password
            }
        ])

        this.on("ready", this.onReady.bind(this));
        this.on("messageCreate", (msg: Eris.Message) => CommandHandler.run(msg, this));
    }

    public getColor(color: colors) {
        let colorTree = {
            RED: 0xCB0E36,
            ORANGE: 0xff7d45,
            YELLOW: 0xfff645,
            GREEN: 0x45ff4b,
            BLUE: 0x4580ff,
            PURPLE: 0xda45ff
        }

        return colorTree[color];
    }

    onReady() {
        this.editStatus("online", {
            name: `Mod Logs`,
            type: 0
        });
        this.logger.success(`Started client ${this.user.username}`);
    } 

    async connect() {
        super.connect()
        .catch((error) => {
            this.logger.error(error);
        });
        //await this.player.startServers();
    }
}