const Command = require("../../../structures/Command");
const MessageEmbed = require("../../../util/MessageEmbed");

module.exports = new Command(
  {
    name: "prefix",
    desc: "Sets the bots current prefix to the new one.",
  },
  async ({ database, message, args, guild }) => {
    if (!args[0]) {
      return message.channel.createMessage({
        embeds: [
          new MessageEmbed().createErrorEmbed(
            "Not arguments supplied for the prefix."
          ),
        ],
      });
    }
    let raw = await database.raw("SELECT * FROM `guild_prefixes`");

    if (!raw[0].find((data) => data.guild === guild.id)) {
      await database
        .insert({ prefix: args[0], guild: guild.id })
        .table("guild_prefixes");
    } else {
      await database
        .update({ prefix: args[0], guild: guild.id })
        .table("guild_prefixes");
    }
    message.channel.createMessage({
      embeds: [
        new MessageEmbed().createSuccessEmbed(
          `Server prefix set to \`${args[0]}\``
        ),
      ],
    });
  }
);
