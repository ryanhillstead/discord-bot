const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('die')
		.setDescription('Takes the Discord Bot offline'),
	async execute(interaction) {
		await interaction.reply('JS Bot has been diabled')
        process.exit()
	},
}