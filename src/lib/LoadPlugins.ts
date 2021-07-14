import { botPlugin, caches } from "../Context";
import fs from "fs";
import Logger from "../util/Logger";

let logger = new Logger();

export = function({ commands, plugins }: caches<string>) {
    let folder = fs.readdirSync("./dist/src/plugins/");

    for (let file of folder) {
        let plugin: botPlugin = require(`../plugins/${file}/index`);

        plugins.set(plugin.name, plugin);
        logger.success(`Loaded plugin, ${plugin.name}`);

        if (plugin.commands.length) {
            for (let command of plugin.commands) {
                commands.set(command.name, command);
                logger.success(`Loaded command, ${command.name}`);
            }
        }
    }
}