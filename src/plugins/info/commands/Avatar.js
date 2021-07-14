const Command = require("../../../structures/Command");
const Resolver = require("../../../util/Resvolver");
const Util = require("../../../util/Util");

module.exports = new Command({
    name: "avatar",
    desc: "Shows the users avatar"
}, ({ guild, message, args }) => {
    let member = (args.length) ? Resolver.getUser(guild, args[0]) : message.member;

    if (!member) {
        return Util.commandError(message.channel, "That user could not be found.");
    }

    let isGif = member.avatarURL.endsWith(".gif") ? ".gif" : ".jpeg";

    if (args[1] === "--raw") {
        return message.channel.createMessage(
            Util.createCodeBlock(member.user.dynamicAvatarURL(isGif, 256))
        );
    }

    message.channel.createMessage(member.user.dynamicAvatarURL(isGif, 256));
})