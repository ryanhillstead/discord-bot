/*
List of good sites for the discord bot
- MDN
- w3schools
- npm
- caniuse
- node.js API

Use discord music player or YouTube API for streaming music, streams from youtube
- use Twillio to send text messages through discord
- You may do an alternative to any commands you cannot figure out. e.g. air quality, 
is it tuesday, dictionary, rpc game, connect to youtube and search, sports scores, calculator

Help file, put it in a text file to be accessed by the command line.

- MUST PASS OFF IN PERSON
*/
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js')
const { token } = require('./config.json');
const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`)
})
client.login(token)
client.commands = new Collection()

const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file)
	const command = require(filePath)
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command)
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});