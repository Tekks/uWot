const WS = require('./handler/ws')
const config = require('./config')
const Discord = require('discord.js')
const Commands = require('./handler/commands.js')

var client = new Discord.Client()
client.config = config

new WS(config.web.port, client)
new Commands(Discord, client)

client.on('message', message => {
    if (!message.content.startsWith(config.discord.prefix) || message.author.bot) return;
    const args = message.content.substring(config.discord.prefix.length).trim().split(/\s+/)
    const command = args.shift().toLowerCase()
    try {
        client.commands.get(command).execute(client, message, args)
    } catch (error) {
        message.reply('command not found 🧐')
    }
})

client.on('ready', () => {
    console.log(`Connected as ${client.user.tag}`)
    console.log(`Prefix: ${config.discord.prefix}`)
    client.user.setPresence({
        activity: {
            name: `${config.discord.prefix}honk`
        },
        status: 'dnd'
    })
})

client.login(config.discord.token)