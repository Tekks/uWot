require('dotenv').config()
var config = {};

config.discord = {};
config.web = {};

config.discord.token = process.env.DISCORD_TOKEN
config.web.port = 3000;

config.discord.prefix = ",,"

module.exports = config;