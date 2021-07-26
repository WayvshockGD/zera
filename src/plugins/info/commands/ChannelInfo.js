const Eris = require("eris");
const Command = require("../../../structures/Command");
const MessageEmbed = require("../../../util/MessageEmbed");
const Resolver = require("../../../util/Resvolver");
let moment = require("moment");

module.exports = new Command({
    name: "channelinfo",
    desc: "Channel info command for showing channel info."
}, ({ message, client, args, guild }) => {
    let channelInfo = (args.length) ? channel(args[0], client, guild) : message.channel;

    if (!channelInfo) {
        return message.channel.createMessage({
            embeds: [
                {
                    ...new MessageEmbed()
                       .createErrorEmbed("Cannot find that channel in-guild.")
                }
            ]
        })
    }

    /** @type {Eris.EmbedOptions} */
    let embed = {
        title: `Channel #${channelInfo.name}`,
        color: client.getColor("BLUE"),
        fields: [
            {
                name: "ID",
                value: channelInfo.id
            },
            {
                name: "Is nsfw",
                value: channelInfo.nsfw ? "yes" : "no"
            },
            {
                name: "Position",
                value: channelInfo.position
            },
            {
                name: "Created at",
                value: moment.unix(channelInfo.createdAt / 1000).format("llll")
            }
        ]
    }

    if (channelInfo.topic) {
        embed.description = channelInfo.topic;
    }

    return message.channel.createMessage({
        embeds: [{ ...embed }]
    })
})

function channel(args, client, guild) {
    return Resolver.getChannel({ 
        guildID: guild.id,
        client,
        args
     });
}