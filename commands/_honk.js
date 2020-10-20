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
                .then(() => voiceUtil.playAudio('/var/www/tks.wtf/public/sounds/airhorn.mp3', true)).catch(
                    (e) => message.reply(`<:uwot_pepega:767928479287083050> 📣 ${e}`)
                )
        } else {
            message.reply("<:uwot_pepega:767928479287083050> 📣 you are not in an watched VC")
        }
        if (message.channel.type == "text") {
            try {
                //message.delete() 
                message.react('🗑️')
                message.react('3️⃣')
                message.react('2️⃣')
                message.react('1️⃣')
                message.react('0️⃣').then(() => message.delete())

            } catch { }
        }
    },
}





