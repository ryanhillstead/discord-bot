const { SlashCommandBuilder } = require('discord.js')
const fs = require('fs')

function usage() {
    const data = fs.readFileSync(`help.txt`, {encoding:'utf8', flag:'r'})
    return data
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Provides a help page including all commands that JS Bot is able to handle.'),
	async execute(interaction) {
		await interaction.reply(usage())
	},
}