const fs = require('fs')

/**
 * Commands
 * @param {Discord} Discord 
 * @param {Discord.Client} client 
 */
class Commands {
    constructor(Discord, client) {
        client.commands = new Discord.Collection()
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
        for (const file of commandFiles) {
            const command = require(`../commands/${file}`)
            command.name.forEach(name => {
                client.commands.set(name, command)
            })
        }
    }
}

module.exports = Commands