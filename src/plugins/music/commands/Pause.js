const Command = require("../../../structures/Command");
const MessageEmbed = require("../../../util/MessageEmbed");

module.exports = new Command({
    name: "stop",
    desc: "Stops the player."
}, ({ player, message }) => {
    let dispatch = player.get(message.guildID);

    if (!dispatch) {
        return message.channel.createMessage({
            embed: new MessageEmbed()
                   .createErrorEmbed("No player is avalible to stop.")
        })
    }

    if (dispatch.paused) {
        return message.channel.createMessage({
            embed: new MessageEmbed()
                   .createErrorEmbed("Song is already paused!")
        })
    }

    if (dispatch) {
        dispatch.pause(true);
        return message.channel.createMessage({
            embed: new MessageEmbed()
                   .createSuccessEmbed("Paused current playing song.")
        })
    }
})