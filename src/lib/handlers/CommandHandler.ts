import Eris from "eris";
import TestManager from "../../managers/TestManager";
import Zera from "../Zera";

export = class CommandHandler {
    public static run(message: Eris.Message, client: Zera) {
        let {} = client;
        let { prefix } = TestManager;

        if (!message.content.startsWith(prefix)) return;

        let args = message.content.slice(prefix.length).trim().split(" ");

        let command = client.commands.get(args[0]);

        args = args.slice(1);

        if (!command) return;

        command.execute({
            message,
            args,
            client,
            guild: (<Eris.GuildChannel>message.channel).guild
        });
    }
}