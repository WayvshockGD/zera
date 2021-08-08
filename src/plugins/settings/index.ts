import Plugin from "../../structures/Plugin";
import commands from "./commands";

export = new Plugin({
    name: "settings",
    desc: "Settings plugin to set settings.",
    enabled: true,
    commands
})