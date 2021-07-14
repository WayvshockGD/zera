import Plugin from "../../structures/Plugin";
import commands from "./commands"

export = new Plugin({
    name: "info",
    desc: "Brings information commands on the bot.",
    enabled: true,
    commands: commands
})