import { readFileSync } from "fs";
import { parse as parseYaml } from "yaml";

export = function Config() {
    let file = readFileSync("./config.yaml", { encoding: "utf8" });
    return parseYaml(file);
}