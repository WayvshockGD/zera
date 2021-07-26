let Command = require("../../../structures/Command");
let process = require("child_process");
let MessageEmbed = require("../../../util/MessageEmbed");
const Util = require("../../../util/Util");

module.exports = new Command({
    name: "update",
    desc: "Update command that pulls from github.",
    owner: true
}, ({ message }) => {
    let log;

    try {
        message.channel.createMessage("Pulling files from github...");
        log = process.execSync("git pull");
    } catch (error) {
        
    }

    let updateEmbed = new MessageEmbed()
        .setDescription(Util.createCodeBlock(log))
        .setTreeColor("BLUE")
        .create();

    message.channel.createMessage({
        embeds: [{ ...updateEmbed }]
    })
})