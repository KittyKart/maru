const fetch = require('node-fetch') 
const Discord = require('discord.js')

exports.run = async => (client, message, args) => {
        if(message.channel.nsfw == false) {
            message.channel.send("HEY! THIS CHANNEL ISN'T NSFW. PLEASE SET CHANNEL TO NSFW YOUR HORNY FUCK")
            return;
        }
        if(!args[0]) {
            message.channel.send("Please specify someone to spank OWO.")
            return;
        }
        const member = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        if(!member) {
            message.channel.send("I couldn't find the user you wanna spank.")
            return;
        }

        fetch("https://api.neko-chxn.xyz/v1/fuck/img")
        .then(res => res.json())
        .then(body => {
            const e = new Discord.MessageEmbed()
            .setDescription(`<@${member.id}> got spanked by <@${message.author.id}> `)
            .setImage(body.url)
            message.channel.send(e)
        })

    }
    exports.help = {
        name: "spank",
        aliases: [],
        description: "Spank a user",
        useage: "[user]"
    }