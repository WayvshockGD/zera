const Command = require("../../../structures/Command");
const MessageEmbed = require("../../../util/MessageEmbed");

module.exports = new Command({
    name: "play",
    desc: "Play songs in vc."
}, async ({ player, message, args }) => {

    let dispatcher = player.create({
        guild: message.guildID,
        voiceChannel: message.member.voiceState.channelID,
        textChannel: message.channel.id,
        selfDeafen: true
    });


    if (dispatcher.state != "CONNECTED") dispatcher.connect();

    let res = await dispatcher.search(args.join(" "), message.author);


    if (res.loadType === "NO_MATCHES") {
        return message.channel.createMessage({
            embed: new MessageEmbed()
                   .createErrorEmbed(`There were no matches for that song.`)
        })
    }


    dispatcher.queue.add(res.tracks[0]);

    let { tracks } = res;

    message.channel.createMessage({
        embed: new MessageEmbed()
               .createSuccessEmbed(
                   tracks[0].title.length > 32 
                   ?  `Added \`${tracks[0].title.slice(0, 23)}...\` to the queue.`
                   : `Added \`${tracks[0].title}\` to the queue.`
                )
    })

    if (!dispatcher.playing && !dispatcher.paused && dispatcher.queue.totalSize === tracks.length) {
        dispatcher.play();
    } else if (!dispatcher.playing && !dispatcher.paused && !dispatcher.queue.size) {
        dispatcher.play();
    }
})