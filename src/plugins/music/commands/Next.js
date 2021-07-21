const Command = require("../../../structures/Command");
const MessageEmbed = require("../../../util/MessageEmbed");

module.exports = new Command({
    name: "next",
    desc: "Skips the song."
}, ({ player, message }) => {
    let dispatch = player.get(message.guildID);

    if (!dispatch) {
        return message.channel.createMessage({
            embed: new MessageEmbed()
                   .createErrorEmbed("No players are avalible.")
        })
    }

    if (!dispatch.queue.current) {
        return message.channel.createMessage({
            embed: new MessageEmbed()
                   .createErrorEmbed("No songs are currently playing.")
        })
    }

    dispatch.stop();
    return message.channel.createMessage({
        embed: new MessageEmbed()
               .createSuccessEmbed(`Skipped song \`( ${dispatch.queue.current.title} )\``)
    })
})