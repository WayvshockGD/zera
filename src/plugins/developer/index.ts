import Plugin from "../../structures/Plugin";
import commands from "./commands";

export = new Plugin({
    name: "developer",
    desc: "Adds developer commands to the bot.",
    enabled: true,
    commands
})