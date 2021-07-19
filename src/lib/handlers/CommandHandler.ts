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

        if (subCommand) {
            args = args.slice(2);
            return subCommand.execute({
                message,
                args,
                client,
                guild: (<Eris.GuildChannel>message.channel).guild
            });
        }

        args = args.slice(1);
        command.execute({
            message,
            args,
            client,
            guild: (<Eris.GuildChannel>message.channel).guild
        });
    }
}