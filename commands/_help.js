const config = require('../config.js')
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['h', 'hilfe'],
    usage: '[command name]',
    description: 'Help Function',
    execute(client, message, args) {
        const data = []
        const { commands } = message.client
        const embed = new Discord.MessageEmbed()
            .setColor('#fedd58')
            .setTitle('Help - Commands')
            .setAuthor('uWot Bot', 'https://cdn.discordapp.com/avatars/755913893062246511/2d6c33c51b36565a2f57ad1a1fc508b1.png', 'https://tks.wtf/#uwot')
        if (!args.length) {
            commands.map(command => embed.addField(config.discord.prefix + command.name, command.description))
            embed.setDescription(`\nYou can send \`${config.discord.prefix}help [command name]\` to get info on a specific command`)
            return message.channel.send(embed)
        }

        const name = args[0].toLowerCase()
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name))

        if (!command) {
            return message.reply('command not found 🧐')
        }

        embed.setTitle(`Command Details:  ${config.discord.prefix + command.name}`)
        if (command.aliases) embed.addField('Aliases', command.aliases.join(', '))
        if (command.description) embed.addField('Description', command.description)
        if (command.usage) embed.addField('Usage', `${config.discord.prefix}${command.name} ${command.usage}`)

        message.channel.send(embed)
    },
}