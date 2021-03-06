import Eris from "eris";
import Config from "../../Config";
import TestManager from "../../managers/TestManager";
import MessageEmbed from "../../util/MessageEmbed";
import Zera from "../Zera";

let { config } = Config();

export = class CommandHandler {
  public static async run(message: Eris.Message, client: Zera) {
    let { subCommands } = client;
    let prefixConfig = TestManager;
    let prefix = prefixConfig.prefix;
    let guild = (<Eris.GuildChannel>message.channel).guild;

    if (guild) {
      let raw = await client.database.raw("SELECT * FROM `guild_prefixes`");
      let data = raw[0].find((d: { guild: string }) => d.guild === guild.id);
      prefix = data ? data.prefix : prefixConfig.prefix;
    }

    if (!message.content.startsWith(prefix)) return;

    let args = message.content.slice(prefix.length).trim().split(" ");

    let command = client.commands.get(args[0]);

    if (!command) return;

    let subCommand = subCommands.get(args[1]);

    args = args.slice(1);

    if (
      ["next", "pause", "queue", "resume", "play", "filter"].includes(
        command.name
      ) &&
      message.member?.voiceState.channelID === undefined
    ) {
      return message.channel.createMessage(
        "Join a voice channel first before running."
      );
    }

    if (command.permissions?.length) {
      let perms: string[] = [];
      for (let perm of command.permissions) {
        // @ts-ignore
        if (!guild.permissionsOf(message.author.id).has(perm)) {
          perms.push(perm);
        }
      }

      if (perms.length) {
        return message.channel.createMessage({
          embed: new MessageEmbed({}).createErrorEmbed(
            `You need the permissions \`${perms.join(", ")}\` to use this.`
          ),
        });
      }
    }

    if (command.owner && !config.owners.includes(message.author.id)) return;

    if (subCommand) {
      args = args.slice(1);
      return subCommand.execute({
        message,
        args,
        client,
        guild,
        player: client.player,
        database: client.database,
      });
    }

    command.execute({
      message,
      args,
      client,
      guild,
      player: client.player,
      database: client.database,
    });
  }
};
