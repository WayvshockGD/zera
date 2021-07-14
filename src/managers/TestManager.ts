import Config = require("../Config");

let { config } = Config();

export = {
    token: config.beta ? config.token.betaToken : config.token.botToken,
    prefix: config.beta ? config.prefix.betaPrefix : config.prefix.botPrefix
}