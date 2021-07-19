import Eris from "eris";

export = class Resolver {
    public static getUser(guild: Eris.Guild, args: string) {
        let user = guild.members.find(u => u.id === this.clean(args)) ||
                   guild.members.find(u => u.username === args) ||
                   guild.members.find(u => u.nick === args);
        
        return user;

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