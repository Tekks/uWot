const express = require('express')
const VoiceUtil = require('../handler/voice.js')
const router = express.Router()

module.exports = function (client) {

    router.get('/', function (req, res, next) {
        res.setHeader("Content-Type", "application/json")
        res.json()

        var voiceUtil = new VoiceUtil()
        
        var user = client.users.cache.find(u => u.tag === req.query.discordUsername)
        if (!user) {
            user = client.users.cache.find(u => u.id === req.query.discordUserId)
        }
        if (!user) return

        client.guilds.cache.forEach(async (guild) => {
            var member = guild.member(user.id)
            if (member) {
                var voiceChannel = member.voice.channel
                if (voiceChannel) {
                    await voiceUtil.connectVoiceChannel(voiceChannel)
                    await voiceUtil.playAudio('/var/www/tks.wtf/public/sounds/airhorn.mp3', true)
                    client.users.cache.get(user.id).send("You got remotely Honked")
                }
            }
        })
    })

    return router;

}

