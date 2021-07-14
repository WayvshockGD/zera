import { botCommand, ctx } from "../Context";

type execute = ({}: ctx) => void;

export = class Command {

    fn: execute;

    name: string;

    desc: string;

    permission: string | undefined;

    owner: boolean | undefined;

    constructor(options: botCommand, fn: execute) {

        this.fn = fn;

        this.name = options.name;

        this.permission = options.permission;

        this.desc = options.desc;

        this.owner = options.owner;

    }

    public execute({ message, args, client, guild }: ctx) {
        this.fn({
            message,
            args,
            client,
            guild
        });
    }

}