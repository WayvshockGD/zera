const Command = require("../../../structures/Command");
let colorParser = require("color-parser");
const MessageEmbed = require("../../../util/MessageEmbed");

module.exports = new Command({
    name: "color",
    desc: "Color command, shows colors based on args"
}, ({ args, message }) => {

    let regex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

    switch (regex.test(args[0])) {
        case true:
            let color = args[0].startsWith("#") ? args[0] : `#${args[0]}`;
            let parsed = colorParser(color);
            let embedColor = `0x${color.split("#")[1]}`;

            message.channel.createMessage({
                embed: new MessageEmbed()
                        .setFields([
                            {
                                name: "Color",
                                value: color.toLowerCase(),
                            },
                            {
                                name: "RGB",
                                value: Object.values(parsed).join(", ") 
                            }
                        ])
                        .setIntColor(parseInt(embedColor))
                        .create()
            })
            break;
        case false:
            return message.channel.createMessage({
                embed: new MessageEmbed()
                       .createErrorEmbed(`Unknown color \`${args[0]}\``)
            });
        default:
            message.channel.createMessage("Say a color you need to look at.");
            break;
    }
})