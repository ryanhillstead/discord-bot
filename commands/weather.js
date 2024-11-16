const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { toLower } = require('lodash')
let {getWeather} = require('weathers-watch')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('weather')
		.setDescription('Gets local weather when given a city name.')
        .addStringOption(option => option.setName('location').setDescription('City.').setRequired(true))
        .addStringOption(option => option.setName('country').setDescription('Country').setRequired(true)),
	    async execute(interaction) {

        const { options } = interaction
        const location = options.getString(toLower('location'))
        const country = options.getString(toLower('country'))
		await interaction.reply({ content : `Gathering Weather Data...`})

        let weatherResult = await getWeather(`${location}`, `${country}`, async function(err, result) {
            
            setTimeout(() => {
                if(err){
                    console.log(err)
                    interaction.editReply({content: `${err} | Sometimes timeouts happen when pulling data. Please try this command again.`})
                } 
                else{
                    if(result.length === 0){
                        return interaction.editReply({content: `Could not find Weather for ${location}`})
                    }
                  

                }
                },2000)
                
	    })
        try{
            const temp = weatherResult.currentWeather.temperature
            const name = weatherResult.location
        }catch (error){
            return interaction.editReply({content: `Could not find Weather for ${location}`})
        }
        const temp = weatherResult.currentWeather.temperature
        const name = weatherResult.location

        const embed = new EmbedBuilder()
        .setColor('Blue')
        .setTitle(`Current Weather of ${name}`)
        .addFields({name: 'Temperature', value: `${temp}`})


        interaction.editReply({content: '', embeds: [embed]})
        }
    }