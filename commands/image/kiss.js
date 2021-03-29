const fetch = require('node-fetch') 
const Discord = require('discord.js')


exports.run = async (client, message, args) => {
        if(!args[0]) {
            message.channel.send("Please specify someone to kiss.")
            return;
        }
        const member = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        if(!member) {
            message.channel.send("I couldn't find the user you wanna kiss.")
            return;
        }

        fetch("https://api.neko-chxn.xyz/v1/kiss/img")
        .then(res => res.json())
        .then(body => {
            const e = new Discord.MessageEmbed()
            .setDescription(`<@${member.id}> got kissed by <@${message.author.id}> `)
            .setImage(body.url)
            message.channel.send(e)
        })

    }

exports.help = {
    name: "kiss",
    aliases: [],
    description: "Kiss a user",
    useage: "[user]"
}
