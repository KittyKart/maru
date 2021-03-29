const { MessageAttachment } = require('discord.js');
const mongoose = require('mongoose')
const moment = require('moment')

exports.run = async (client, message, args) => {
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            message.channel.send("You are not allowed to use this sowwwwy. You need the `KICK_MEMBERS` permission.")
            return;
        }
        if(!args[0]) {
            message.channel.send("Please specify someone to warn uwu.")
            return;
        }
        const member = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        if(!member) {
            message.channel.send("I couldn't find this user.'")
            return;
        }
        let reason = args.slice(1).join(" ")

        if(!reason) reason = "No reason"

        let memberID = member.id

        let punishID = Math.floor(Math.random() * 9999999999 - 1111111111) + 1111111111

        message.channel.send(`User warned with infraction ID ${punishID}`)

        let modID = message.author.id

        let guildid = message.guild.id

        let date = moment().format('MMMM Do YYYY, h:mm A (AT)')

        const mongo = require('../../utils/mongo')
        const infraction = require('../../models/infraction')

        await mongo().then(async (mongoose) => {
        try {
            const warn = {
            userid: memberID,
            guild:  guildid,
            punishid: punishID,
            type: "Warn",
            time: date,
            modid: modID,
            reason: reason,
            }

            await new infraction(warn).save()
        } finally {
          mongoose.connection.close()
        }
    })
  }

  exports.help = {
    name: "warn",
    aliases: [],
    description: "Warn a user",
    useage: "[user] (reason)"
}