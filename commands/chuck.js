const { SlashCommandBuilder } = require('discord.js')
const fs = require('fs')

function getJoke() {
    const data = fs.readFileSync(`chucknorris.txt`, {encoding:'utf8', flag:'r'})
    let jokes = data.split('\n')
    return jokes[Math.floor(Math.random()*jokes.length)]
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chuck')
		.setDescription('Tells a random Chuck Norris joke.'),
	async execute(interaction) {
		await interaction.reply(getJoke())
	},
}