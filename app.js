const fs = require('fs')
const WS = require('./handler/ws')
const Discord = require('discord.js')
const VoiceUtil = require('./handler/voice.js')
const config = require('./config')

var client = new Discord.Client()
client.config = config

new WS(config.web.port, client)

// ToDo: CommandHandler

client.on('message', message => {

    if (!message.content.startsWith(config.discord.prefix) || message.author.bot) return;

    const args = message.content.substring(config.discord.prefix.length).trim().split(/\s+/)
    const command = args.shift().toLowerCase()
    const cmdMatches = ['honk', 'airhorn']

    if (cmdMatches.includes(command)) {
        let userId = message.author.id

        const voiceUtil = new VoiceUtil()
        let voiceChannel = voiceUtil.getVoiceChannel(client, userId)

        if (voiceChannel) {
            voiceUtil.connectVoiceChannel(voiceChannel)
                .then(() => voiceUtil.playAudio('/var/www/tks.wtf/public/sounds/airhorn.mp3', true))
        }
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