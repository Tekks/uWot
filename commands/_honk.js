const VoiceUtil = require('../handler/voice.js')

const debounceMs = 1000
let lastDebounce = null

module.exports = {
    name: 'honk',
    aliases: ['airhorn', 'trumpet', 'wakeup'],
    usage: '',
    description: 'Honks at you, if you\'re in a VC',

    execute(client, message, args) {
        if (lastDebounce && new Date().getTime() - debounceMs <= lastDebounce) return
        lastDebounce = new Date().getTime()

        const voiceUtil = new VoiceUtil()
        let voiceChannel = voiceUtil.getVoiceChannel(client, message.author.id)

        if (voiceChannel) {
            voiceUtil.connectVoiceChannel(voiceChannel)
                .then(() => voiceUtil.playAudio('/var/www/tks.wtf/public/sounds/airhorn.mp3', true))
                .catch(e => message.reply(`<:uwot_pepega:767928479287083050> 📣 ${e}`))
        } else {
            message.reply("<:uwot_pepega:767928479287083050> 📣 you are not in a VC I can track")
        }
    },
}
