const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dm')
		.setDescription('Bot will send a DM to a user.')
        .addUserOption((option)=> 
        option
        .setName('user')
        .setDescription('The user you would like to DM.')
        .setRequired(true)
        )
        .addStringOption((option)=> 
        option
        .setName('message')
        .setDescription('The message you would like to send.')
        .setRequired(true)
        ),
	async execute(interaction) {
		const {channel, client, options} = interaction

        const user = options.getMember('user')
        const message = options.getString('message')

        user.send(message).catch(async (err) => {
            console.log(err)

            return await interaction.editReply({
                content: 'Failed to send message, please try again.'
            }).catch((err)=>{})
        })
        await interaction.reply({
            content: `**${message}** successfully sent to **${user}**`
        })
	},
}