import Plugin from "../../structures/Plugin";
import commands from "./commands";

export = new Plugin({
    name: "music",
    desc: "Music plugin for use in the voice channel.",
    enabled: true,
    commands
})