const VoiceUtil = require('../handler/voice.js')

module.exports = {
    name: ['honk', 'airhorn'],
    description: 'Honks at People',
    execute(message, args) {
        let userId = message.author.id
        const voiceUtil = new VoiceUtil()
        let voiceChannel = voiceUtil.getVoiceChannel(message.client, userId)
        if (voiceChannel) {
            voiceUtil.connectVoiceChannel(voiceChannel)
                .then(() => voiceUtil.playAudio('/var/www/tks.wtf/public/sounds/airhorn.mp3', true))
        }
    },
}





