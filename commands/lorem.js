const { SlashCommandBuilder } = require('discord.js')
let wordbank = 'lorem ipsum dolor sit amet consectetur adipiscing elit maecenas pharetra luctus iaculis pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas fusce in sollicitudin dolor morbi pellentesque vel tellus non lobortis suspendisse sapien leo gravida eget cursus suscipit pulvinar nec purus donec eu semper tellus Nunc tristique massa a massa aliquet placerat morbi eget leo felis aenean vitae diam feugiat consectetur odio et pretium leopraesent velit leo, scelerisque vitae lorem non, convallis consequat arcu proin sodales nibh in maximus sagittis morbi nec mi in ligula interdum dignissim vitae ac odio Maecenas id massa id odio'.split(' ')

function randText(){
    let sentence = `${wordbank[Math.floor(Math.random()*wordbank.length)]}`
    sentence = sentence[0].toUpperCase() + sentence.substring(1)
    for(let i = 0; i<34; i++) sentence += ` ${wordbank[Math.floor(Math.random()*wordbank.length)]}`
    sentence += `.`
    return sentence
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lorem')
		.setDescription('Produces Lorem Ipsum words.'),
	async execute(interaction) {
		await interaction.reply(`${randText()}`)
	},
}