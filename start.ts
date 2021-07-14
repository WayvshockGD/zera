import Zera from "./src/lib/Zera";

new Zera({
    messageLimit: 40,
    compress: true,
    allowedMentions: {
        everyone: false
    },
}).connect();