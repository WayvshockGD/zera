import Eris = require("eris");
import { botCommand, botPlugin, botSubCommand, colors } from "../Context";
import TestManager = require("../managers/TestManager");
import Logger = require("../util/Logger");
import CommandHandler = require("./handlers/CommandHandler");
import LoadPlugins = require("./LoadPlugins");
import LavaServer from "./LavaServer";
import Config = require("../Config");
import { GatewayServer, SlashCreator } from "slash-create";
import path = require("path");
import Knex from "../database/Knex";

let { config } = Config();

export = class Zera extends Eris.Client {
  database = Knex;
  commands = new Map<string, botCommand>();
  plugins = new Map<string, botPlugin>();
  subCommands = new Map<string, botSubCommand>();
  logger: Logger = new Logger();
  player: LavaServer;
  slashCreator: SlashCreator;

  constructor(options: Eris.ClientOptions) {
    super(TestManager.token, options);

    LoadPlugins({
      commands: this.commands,
      plugins: this.plugins,
      subCommands: this.subCommands,
    });

    this.slashCreator = new SlashCreator({
      applicationID: TestManager.id,
      publicKey: TestManager.key,
      token: TestManager.token,
    });

    this.player = new LavaServer({
      nodes: [
        {
          host: config.lavalink.host,
          port: config.lavalink.port,
          password: config.lavalink.password,
          identifier: "zera/nodes/1",
        },
      ],
      send: (id, payload) => {
        let guild = this.guilds.get(id);

        if (guild) {
          guild.shard.sendWS(payload.op, payload.d);
        }
      },
    });

    this.player.on("nodeConnect", (node) => {
      this.logger.success(
        `Launched lavaPlayer node ${node.options.identifier}`
      );
    });
    this.player.on("trackStart", ({ textChannel }, tr) => {
      this.createMessage(`${textChannel}`, {
        embed: {
          description: `Playing track [${tr.title}](${tr.uri})`,
          thumbnail: {
            url: tr.displayThumbnail("maxresdefault"),
          },
        },
      });
    });
    this.player.on("trackError", (pl, tr) => {
      this.createMessage(`${pl.textChannel}`, {
        embed: {
          description: `There was a error while playing ${tr.title}`,
        },
      });
    });
    this.player.on("queueEnd", (pl, tr) => {
      this.createMessage(pl.textChannel!, {
        embed: {
          description: `Queue has ended, leaving vc...`,
        },
      });
      pl.destroy();
    });

    this.on("rawWS", (payload) => {
      // @ts-ignore
      this.player.updateVoiceState(payload);
    });
    this.on("ready", this.onReady.bind(this));
    this.on("messageCreate", (msg: Eris.Message) =>
      CommandHandler.run(msg, this)
    );
    this.initSlash();
  }

  private async initTables() {
    if (!(await this.database.schema.hasTable("guild_prefixes"))) {
      await this.database.schema.createTable("guild_prefixes", (table) => {
        table.increments();
        table.string("guild").notNullable();
        table.string("prefix").notNullable();
      })
    }
  }

  private initSlash() {
    this.slashCreator
      .withServer(
        new GatewayServer((h) =>
          this.on("rawWS", (event) => {
            // @ts-ignore
            if (event.t === "INTERACTION_CREATE") h(event.d);
          })
        )
      )
      .registerCommandsIn(path.join(__dirname, "..", "slash"))
      .syncCommands();
  }

  public getColor(color: colors) {
    let colorTree = {
      RED: 0xcb0e36,
      ORANGE: 0xff7d45,
      YELLOW: 0xfff645,
      GREEN: 0x45ff4b,
      BLUE: 0x4580ff,
      PURPLE: 0xda45ff,
    };

    return colorTree[color];
  }

  onReady() {
    this.editStatus("idle", {
      name: `Mod Logs`,
      type: 0,
    });
    this.initTables();
    this.player.init(this.user.id);
    this.logger.success(`Started client ${this.user.username}`);
  }

  async connect() {
    super.connect().catch((error) => {
      this.logger.error(error);
    });
    //await this.player.startServers();
  }
};
