import Plugin from "../../structures/Plugin";

export = new Plugin({
    name: "utility",
    desc: "Utility commands to help.",
    enabled: true,
    commands: require("./commands")
})