import { botSubCommand, ctx, execute } from "../Context";
import Command from "./Command";

export = class SubCommand extends Command {
    constructor(options: botSubCommand, fn: execute) {
        // @ts-ignore
        super(options, fn);
    }
}