require('dotenv').config()
var config = {};

config.discord = {};
config.web = {};

config.discord.token = process.env.DISCORD_TOKEN
config.discord.pubtoken = process.env.PUBLIC_TOKEN
config.discord.invite = "https://discord.com/api/oauth2/authorize?client_id=755913893062246511&permissions=3224857920&scope=applications.commands%20bot"
config.web.port = 3000;

config.discord.prefix = ",,"

module.exports = config;