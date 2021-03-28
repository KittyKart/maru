const fetch = require('node-fetch')
const Discord = require('discord.js')

module.exports = {
    name: "meme",
    description: "Fetch a meme",
    async execute(message) {
        fetch("http://meme-api.herokuapp.com/gimme")
        .then(res => res.json())
        .then(body => {
            const e = new Discord.MessageEmbed()
            e.setTitle(body.title)
            e.setImage(body.url)
            e.setFooter(`👍 ${body.ups}`)
            message.channel.send(e)
        })
    }
}