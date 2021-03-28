const fetch = require('node-fetch') 
const Discord = require('discord.js')

module.exports = {
    name: "fuck",
    description: "fuck someone",
    async execute(message, args) {
        if(message.channel.nsfw == false) {
            message.channel.send("HEY! THIS CHANNEL ISN'T NSFW. PLEASE SET CHANNEL TO NSFW YOUR HORNY FUCK")
            return;
        }
        if(!args[0]) {
            message.channel.send("Please specify someone to fuck OWO.")
            return;
        }
        const member = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        if(!member) {
            message.channel.send("I couldn't find the user you wanna fuck.")
            return;
        }

        fetch("https://api.neko-chxn.xyz/v1/fuck/img")
        .then(res => res.json())
        .then(body => {
            const e = new Discord.MessageEmbed()
            .setDescription(`<@${member.id}> got fucked by <@${message.author.id}> `)
            .setImage(body.url)
            message.channel.send(e)
        })

    }
}