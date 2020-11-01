const mc = require('minecraft-server-util')

/**
 * Minecraft
 * @param {discord} Disocord
 * @param {discord.Client} client 
 * @param {string} channelId 
 * @param {string} messageId
 * @param {string} serverAddress  
 */
class Minecraft {

    constructor(Discord, client, channelId, messageId, serverAddress) {

        this.client = client
        this.channelId = channelId
        this.messageId = messageId
        this.serverAddress = serverAddress
        this.Discord = Discord

        this.getPlayerlist()
        this.changeChannelName()
    }

    setPlayerMemory(playerMemory) {
        this.playerCache = playerMemory
    }

    getPlayerMemory() {
        return this.playerCache
    }

    getPlayerlist() {
        var that = this
        setInterval(function () {
            var embed = new that.Discord.MessageEmbed()
            embed.setTitle(`Server Players ( ${that.serverAddress} )`)
                .setTitle(`Server Players ( ${that.serverAddress} )`)
                .setAuthor('uWot Bot', 'https://cdn.discordapp.com/avatars/755913893062246511/2d6c33c51b36565a2f57ad1a1fc508b1.png', 'https://tks.wtf/#uwot')
                .setThumbnail('https://i1.wp.com/www.craftycreations.net/wp-content/uploads/2019/08/Grass-Block-e1566147655539.png')
            mc.queryFull(that.serverAddress)
                .then((response) => {
                    var i = 1
                    embed.setDescription('```' + response.onlinePlayers +  ' of ' + response.maxPlayers + ' Players online```')
                        .setColor('#00ff00')
                    if (that.getPlayerMemory() == response.players) { that.setPlayerMemory(response.players.join(',')); return }
                    that.setPlayerMemory(response.players.join(','))
                    response.players.forEach(element => {
                        embed.addField(`Player ${i}`, element, true)
                        i++
                    });
                    that.client.channels.cache.get(that.channelId).messages.fetch(that.messageId)
                        .then(message => message.edit(embed))
                })
                .catch((error) => {
                    console.log(error)
                    embed.setDescription('```Server offline```')
                        .setColor('#ff0000')
                    that.client.channels.cache.get(that.channelId).messages.fetch(that.messageId)
                        .then(message => message.edit(embed))
                })
        }, 30000)
    }

    changeChannelName() {
        var that = this
        setInterval(function () {
            mc.status(that.serverAddress)
                .then((response) => {
                    that.client.channels.cache.get(that.channelId).setName(`🟢mc_server_${response.onlinePlayers}-${response.maxPlayers}`)
                })
                .catch((error) => {
                    that.client.channels.cache.get(that.channelId).setName(`🔴mc_server_offline`)
                })
        }, 300000)
    }
}

module.exports = Minecraft