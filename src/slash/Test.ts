import { CommandContext, CommandOptionType, SlashCommand, SlashCreator } from "slash-create";

export = class Test extends SlashCommand {
    constructor(creator: SlashCreator) {
        super(creator, {
            name: "test",
            description: "yes"
        })
    }

    public async run(ctx: CommandContext) {
        return "ok";
    }
}