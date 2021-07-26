import Eris from "eris";
import Zera from "../lib/Zera";

interface channelOpts {
    guildID: string;
    args: string;
    client: Zera;
}

export = class Resolver {
    public static getUser(guild: Eris.Guild, args: string) {
        let user = guild.members.find(u => u.id === this.clean(args)) ||
                   guild.members.find(u => u.username === args) ||
                   guild.members.find(u => u.nick === args);
        
        return user;
    }

    public static getChannel({ guildID, client, args }: channelOpts) {
        let guild = client.guilds.get(guildID);

        return guild?.channels.find(c => c.id === this.clean(args)) ||
               guild?.channels.find(c => c.name === args);
    }

    private static clean(args: string) {
        let values = [
            "<",
            ">",
            "@",
            "!",
            "#"
        ]

        for (let value of values) {
            args = args.replace(value, "");
        }

        return args;
    }
}