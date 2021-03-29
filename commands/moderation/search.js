const mongoose = require('mongoose')
const infraction = require('../../models/infraction')
const Discord = require('discord.js')
const mongo = require('../../utils/mongo')
exports.run = async (client, message, args) => {
    let member = message.member

    if(args[0]) member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    if(!member){
      members = args[0]
    }
        
    message.channel.send("Please wait... (The more infractions the longer this takes)").then(async (msg) => {
    await mongo().then(async () => {
        try {
        const e = new Discord.MessageEmbed()
        const infractions = await infraction
        .find({ userid: member.user.id, guild: message.guild.id })

             
        if(infractions.length == 0 ){
            message.channel.send(`${member.user.tag} has no infractions!`);
            msg.delete();
            return;
        }

        await infractions.forEach((infraction) => {
            e.addField(`Punishment ID:`, String(infraction.punishid), true);
            e.addField(`Reason:`, infraction.reason, true);
            e.addField(`Mod ID:`, infraction.modid, true);
            e.addField(`Type:`, infraction.type, true);
        });
        message.channel.send(e)
        msg.delete()
        } finally {
            mongoose.connection.close();
        }
        })
    })
    
        }
        exports.help = {
            name: "search",
            aliases: [],
            description: "Search a user",
            useage: "[user]"
        }