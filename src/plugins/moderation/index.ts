import Plugin from "../../structures/Plugin";
import commands from "./commands";

export = new Plugin({
    name: "Moderation",
    enabled: true,
    desc: "Adds the ability for zera to have moderation.",
    commands
})