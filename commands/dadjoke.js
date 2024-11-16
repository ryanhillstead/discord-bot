const { SlashCommandBuilder } = require('discord.js')
const fs = require('fs')

function getJoke() {
    const data = fs.readFileSync(`dadjokes.txt`, {encoding:'utf8', flag:'r'})
    let jokes = data.split('\n')
    return jokes[Math.floor(Math.random()*jokes.length)]
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dadjoke')
		.setDescription('Tells a random dad joke.'),
	async execute(interaction) {
		await interaction.reply(getJoke())
	},
}