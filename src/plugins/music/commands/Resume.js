const Command = require("../../../structures/Command");
const MessageEmbed = require("../../../util/MessageEmbed");

module.exports = new Command({
    name: "start",
    desc: "Starts the song when its paused."
}, ({ player, message }) => {
    let dispatch = player.get(message.guildID);

    if (!dispatch) {
        return message.channel.createMessage({
            embed: new MessageEmbed()
                   .createErrorEmbed("No player is avalible to resume.")
        })
    }

    if (!dispatch.paused) {
        return message.channel.createMessage({
            embed: new MessageEmbed()
                   .createErrorEmbed("Song is not paused.")
        })
    }

    if (dispatch) {
        dispatch.pause(false);
        return message.channel.createMessage({
            embed: new MessageEmbed()
                   .createSuccessEmbed("Unpaused current song.")
        })
    }
})