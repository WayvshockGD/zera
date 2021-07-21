import { botCommand, ctx, execute, subCommandBuilder } from "../Context";

export = class Command {

    fn: execute;

    name: string;

    desc: string;

    enabled: boolean;

    permission: string | undefined;

    owner: boolean | undefined;

    subCommands: subCommandBuilder[];

    constructor(options: botCommand, fn: execute) {

        this.fn = fn;

        this.name = options.name;

        this.permission = options.permission;

        this.desc = options.desc;

        this.owner = options.owner;

        this.enabled = options.enabled;

        this.subCommands = options.subCommands || [];

    }

    public execute(context: ctx) {
        this.fn(context);
    }

}