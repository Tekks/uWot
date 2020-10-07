const fs = require('fs')

/**
 * Commands
 * @param {Discord} Discord 
 * @param {Discord.Client} client 
 */
class Commands {
    constructor(Discord, client) {
        client.commands = new Discord.Collection()
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'), file => file.startsWith('_'))
        for (const file of commandFiles) {
            const command = require(`../commands/${file}`)
            client.commands.set(command.name, command)
        }
    }
}

module.exports = Commands