const express = require('express')
const nacl = require('tweetnacl')
const request = require('request')
const router = express.Router()
const VoiceUtil = require('../handler/voice.js')
const config = require('../config.js')

module.exports = function (client) {
    router.post('/', function (req, res, next) {
        const isVerified = nacl.sign.detached.verify(
            Buffer.from(req.get('X-Signature-Timestamp') + JSON.stringify(req.body)),
            Buffer.from(req.get('X-Signature-Ed25519'), 'hex'),
            Buffer.from(config.discord.pubtoken, 'hex')
        )
        if (!isVerified) {
            res.status(401).end('invalid request signature')
            return router
        }
        let token = req.body.token
        let interactionId = req.body.id
        let url = `https://discord.com/api/v8/interactions/${interactionId}/${token}/callback`
        const voiceUtil = new VoiceUtil()
        let voiceChannel = voiceUtil.getVoiceChannel(client, req.body.member.user.id)
        if (voiceChannel) {
            voiceUtil.connectVoiceChannel(voiceChannel)
            .then(() => voiceUtil.playAudio('/var/www/tks.wtf/public/sounds/airhorn.mp3', true))
            .then(sendMsg(url, 4, "<:uwot_pepega:767928479287083050> 📣 Honk 66 executed"))
            .catch(e => sendMsg(url, 4, `<:uwot_pepega:767928479287083050> 📣 ${e}`))
        } else {
            sendMsg(url, 4, "<:uwot_pepega:767928479287083050> 📣 you are not in a VC I can track")
        }
    })
    return router
}

function sendMsg(url, type, message) {
    let body = {}
    body = {
        "type": type,
        "data": {
            "content": message
        }
    }
    request.post({
        headers: { 'content-type': 'application/json' },
        url: url,
        body: JSON.stringify(body)
    })
}