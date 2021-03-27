const mongoose = require('mongoose')
const infraction = require('../models/infraction')
const Discord = require('discord.js')
module.exports = {
    name: "search",
    description: "search a user",
    async execute(message, args) {
        const member = message.mentions.members.first() || args[0];
        let e = new Discord.MessageEmbed()
        let infractions = await infraction
        .find({ userid: member.id, guild: message.guild.id })

         
        await infractions.forEach((infraction) => {
            e.addField(`Punishment ID:`, String(infraction.punishid), true);
            e.addField(`Reason:`, infraction.reason, true);
            e.addField(`Mod ID:`, infraction.modid, true);
            e.addField(`Type:`, infraction.type, true);
        });

        if(infractions.length == 0){
            e.setDescription(`${member.user.tag} has no infractions!`);
        }

        message.channel.send(e)

        }
}