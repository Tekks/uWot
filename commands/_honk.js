const VoiceUtil = require('../handler/voice.js')

module.exports = {
    name: 'honk',
    aliases: ['airhorn', 'trumpet', 'wakeup'],
    usage: '',
    description: 'Honks at you, if you\'re in an VC',
    execute(client, message, args) {
        const voiceUtil = new VoiceUtil()
        let voiceChannel = voiceUtil.getVoiceChannel(client, message.author.id)
        if (voiceChannel) {
            voiceUtil.connectVoiceChannel(voiceChannel)
                .then(() => voiceUtil.playAudio('/var/www/tks.wtf/public/sounds/airhorn.mp3', true))
        }
        if (message.channel.type == "text"){
            try { message.delete() }catch{}
        }
    },
}





