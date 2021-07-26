const { inspect } = require("util");
const Command = require("../../../structures/Command");
const Util = require("../../../util/Util");

module.exports = new Command({
    name: "eval",
    owner: true,
    desc: "Eval command to use js with."
}, ({ message, args }) => {
    let code;

    try {
        code = inspect(eval(args.join(" ")));
    } catch (error) {
        return message.channel.createMessage(err);
    }

    return message.channel.createMessage(Util.createCodeBlock(code));
})