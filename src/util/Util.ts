import Eris from "eris"

export = class Util {
    public static commandError<T>(channel: Eris.TextChannel, content: T) {
        return channel.createMessage({
            embed: {
                color: 0xff4d4d,
                description: `:x: ${content}`
            }
        })
    }
}