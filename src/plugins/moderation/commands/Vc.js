const Command = require("../../../structures/Command");
const SubCommand = require("../../../structures/SubCommand");
const MessageEmbed = require("../../../util/MessageEmbed");
const Resolver = require("../../../util/Resvolver");

let mute = new SubCommand({
    name: "mute",
    desc: "Mutes a user in a voice channel.",
}, ({ message, guild, args }) => {

    if (!args[0]) {
        return message.channel.createMessage({
            embed: new MessageEmbed()
                   .createErrorEmbed("You must mention a user.")
        });
    }
    let member = Resolver.getUser(guild, args[0]);

    if (!member.voiceState.id) {
        return message.channel.createMessage({
            embed: new MessageEmbed()
                   .createErrorEmbed("User is not in a voice channel")
        })
    }

    member.edit({ mute: true }, args[1] || "No reason");
})

module.exports = new Command({
    name: "vc",
    desc: "Mute command for voice channels",
    subCommands: [
        {
            name: mute,
        }
    ]
}, () => {
    return;
})