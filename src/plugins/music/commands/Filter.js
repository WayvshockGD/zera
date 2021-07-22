const Command = require("../../../structures/Command");
const MessageEmbed = require("../../../util/MessageEmbed");

module.exports = new Command({
    name: "filter",
    desc: "Adds a filter to the song."
}, ({ player, args, message }) => {
    let dispatch = player.get(message.guildID);

    if (!dispatch) {
        return message.channel.createMessage({
            embed: new MessageEmbed()
                   .createErrorEmbed("No player is available...")
        })
    }

    switch (args[0]) {
        case "nightcore":
            if (dispatch.nightcore) {
                dispatch.nightcore = false;
            } else {
                dispatch.nightcore = true;
            }
            message.channel.createMessage(dispatch.nightcore 
                    ? "Turned on nightcore" 
                    : "Turned off nightcore"
                )
            break;
    
        default:
            message.channel.createMessage("Pick either \`Nightcore\`");
            break;
    }
})