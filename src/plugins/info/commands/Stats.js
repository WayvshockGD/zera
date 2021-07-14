const Command = require("../../../structures/Command");
const os = require("os");

module.exports = new Command({
    name: "stats",
    desc: "Shows bot stats",
}, ({ message, client }) => {
    return message.channel.createMessage({
        embed: {
            title: `Showing stats of ${client.user.username}`,
            color: client.getColor("BLUE"),
            fields: [
                {
                    name: "Users",
                    value: client.users.size,
                    inline: true
                },
                {
                    name: "Guilds",
                    value: client.guilds.size,
                    inline: true
                },
                {
                    name: "process",
                    value: os.loadavg().join("."),
                    inline: true
                }
            ]
        }
    })
})