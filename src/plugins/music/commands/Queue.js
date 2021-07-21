const Command = require("../../../structures/Command");
const MessageEmbed = require("../../../util/MessageEmbed");

module.exports = new Command({
    name: "queue",
    desc: "Views the servers song queue."
}, ({ player, message }) => {
    let queue = [];

    let dispatch = player.get(message.guildID);

    if (!dispatch) {
        return message.channel.createMessage({
            embed: new MessageEmbed()
                   .createErrorEmbed("No players avalible for the guild.")
        })
    }

    for (let q of dispatch.queue) {
        if (queue.length > 10) return false;
        q.title = q.title.length > 32 ? q.title = `${q.title.slice(0, 23)}...` : q.title;
        queue.push(`${queue.length} ${q.title} - ( ${q.requester.username} )`);
    }

    let q = queue.length ? queue.join("\n") : "Not enough tracks to show.";

    return message.channel.createMessage(`\`\`\`\n${q}\n\`\`\``);
})