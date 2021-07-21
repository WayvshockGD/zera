import Command from "../../../structures/Command";
import SubCommand from "../../../structures/SubCommand";
import MessageEmbed from "../../../util/MessageEmbed";
import Resolver from "../../../util/Resvolver";
import { DiscordRESTError } from "eris"; 
 
// @ts-ignore
let mute = new SubCommand({
    name: "mute",
    desc: "Mutes a user in a voice channel.",
}, ({ message, guild, args }) => {

    if (!args[0]) {
        return message.channel.createMessage({
            embed: new MessageEmbed({})
                   .createErrorEmbed("You must mention a user.")
        });
    }
    let member = Resolver.getUser(guild, args[0]);

    if (!member) {
        return message.channel.createMessage({
            embed: new MessageEmbed({})
                   .createErrorEmbed("Cannot find that user in this guild.")
        })
    }

    member.edit({ mute: true }, args[1] || "No reason")
           .catch((e: DiscordRESTError) => {
               if (e.code === 40032) {
                   message.channel.createMessage({
                       embed: new MessageEmbed({})
                              .createErrorEmbed("Mentioned user is not in a voice channel")
                   })
               }
           })
           .then(() => {
               message.channel.createMessage({
                   embed: new MessageEmbed({})
                          .createSuccessEmbed(`Muted target ${member?.username}`)
               })
           })
})

// @ts-ignore
let unmute = new SubCommand({
    name: "unmute",
    desc: "Unmutes the user in a voice channel."
}, ({ message, guild, args }) => {

    if (!args[0]) {
        return message.channel.createMessage({
            embed: new MessageEmbed({})
                   .createErrorEmbed("You must mention a user.")
        });
    }
    let member = Resolver.getUser(guild, args[0]);

    if (!member) {
        return message.channel.createMessage({
            embed: new MessageEmbed({})
                   .createErrorEmbed("Cannot find that user in this guild.")
        })
    }

    member.edit({ mute: false }, args[1] || "No reason")
           .catch((e: DiscordRESTError) => {
               if (e.code === 40032) {
                   message.channel.createMessage({
                       embed: new MessageEmbed({})
                              .createErrorEmbed("Mentioned user is not in a voice channel")
                   })
               }
           })
           .then(() => {
               message.channel.createMessage({
                   embed: new MessageEmbed({})
                          .createSuccessEmbed(`Unmuted target ${member?.username}`)
               })
           })
})

module.exports = new Command({
    name: "vc",
    desc: "Mute command for voice channels",
    subCommands: [
        // @ts-ignore
        {
            command: mute,
            enabled: true
        },
        // @ts-ignore
        {
            command: unmute,
            enabled: true
        }
    ]
}, () => {
    return;
})