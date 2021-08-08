import "./src/database/Knex";
import Zera from "./src/lib/Zera";

new Zera({
    messageLimit: 40,
    compress: true,
    intents: [
        "guildMessages", 
        "guilds", 
        "guildMembers", 
        "guildVoiceStates",
    ],
    allowedMentions: {
        everyone: false
    },
}).connect();