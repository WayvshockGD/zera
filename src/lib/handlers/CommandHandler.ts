import Eris from "eris";
import TestManager from "../../managers/TestManager";
import Zera from "../Zera";

export = class CommandHandler {
    public static run(message: Eris.Message, client: Zera) {
        let { subCommands } = client;
        let { prefix } = TestManager;

        if (!message.content.startsWith(prefix)) return;

        let args = message.content.slice(prefix.length).trim().split(" ");

        let command = client.commands.get(args[0]);

        if (!command) return;

        let subCommand = subCommands.get(args[1]);

        args = args.slice(1);

        if ([
            "next", 
            "pause", 
            "queue",
            "resume", 
            "play"
            ].includes(command.name) && !message.member?.voiceState.channelID) {
                return message.channel.createMessage("Join a voice channel first before running.");
            } 

        if (subCommand) {
            args = args.slice(1);
            return subCommand.execute({
                message,
                args,
                client,
                guild: (<Eris.GuildChannel>message.channel).guild,
                player: client.player
            });
        }

        command.execute({
            message,
            args,
            client,
            guild: (<Eris.GuildChannel>message.channel).guild,
            player: client.player
        });
    }
}