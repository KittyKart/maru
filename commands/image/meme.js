const fetch = require('node-fetch')
const Discord = require('discord.js')

exports.run = async (client, message, args) => {
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
exports.help = {
    name: "meme",
    aliases: [],
    description: "Fetch a meme",
    useage: ""
}