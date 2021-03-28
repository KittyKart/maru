const fetch = require('node-fetch') 
const Discord = require('discord.js')

module.exports = {
    name: "anal",
    description: "fetch some anal",
    async execute(message, args) {
        if(message.channel.nsfw == false) {
            message.channel.send("HEY! THIS CHANNEL ISN'T NSFW. PLEASE SET CHANNEL TO NSFW YOUR HORNY FUCK")
            return;
        }

        fetch("https://api.neko-chxn.xyz/v1/anal/img")
        .then(res => res.json())
        .then(body => {
            const e = new Discord.MessageEmbed()
            .setDescription(`Here you go`)
            .setImage(body.url)
            message.channel.send(e)
        })

    }
}