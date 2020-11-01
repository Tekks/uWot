const WS = require('./handler/ws')
const config = require('./config')
const Discord = require('discord.js')
const Commands = require('./handler/commands.js')
const Minecraft = require('./botfunctions/minecraft.js')

var client = new Discord.Client()
client.config = config

new WS(config.web.port, client)
new Commands(Discord, client)


client.on('message', message => {
    if (!message.content.startsWith(config.discord.prefix) || message.author.bot) return;
    const args = message.content.substring(config.discord.prefix.length).trim().split(/\s+/)
    const name = args.shift().toLowerCase()
    try {
        if (!name) return
        const command = client.commands.get(name) || client.commands.find(c => c.aliases && c.aliases.includes(name))
        command.execute(client, message, args)
    } catch (error) {
        console.log(error)
    }
})

client.on('ready', () => {
    console.log(`Connected as ${client.user.tag}`)
    console.log(`Prefix: ${config.discord.prefix}`)
    client.user.setPresence({
        activity: {
            name: `${config.discord.prefix}help ${config.discord.prefix}honk`
        },
        status: 'dnd'
    })

    new Minecraft(Discord, client, '770239786597351444', '772453177395249162', 'mc.tks.wtf')

})

client.login(config.discord.token)