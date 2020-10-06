const VoiceUtil = require('../handler/voice.js')

module.exports = {
    name: ['honk', 'airhorn'],
    description: 'Honks at People',
    execute(client, message, args) {
        const voiceUtil = new VoiceUtil()
        let voiceChannel = voiceUtil.getVoiceChannel(client, message.author.id)
        if (voiceChannel) {
            voiceUtil.connectVoiceChannel(voiceChannel)
                .then(() => voiceUtil.playAudio('/var/www/tks.wtf/public/sounds/airhorn.mp3', true))
        }
    },
}





