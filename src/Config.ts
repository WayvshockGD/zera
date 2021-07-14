import { readFileSync } from "fs";
import { parse as parseYaml } from "yaml";
import { config } from "./Context";

export = function Config(): config {
    let file = readFileSync("./config.yaml", { encoding: "utf8" });
    return parseYaml(file);
}