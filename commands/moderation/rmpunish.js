const infraction = require('../../models/infraction')
const mongo = require('../../utils/mongo')
const mongoose = require('mongoose')
const { Message } = require('discord.js')
exports.run = async (client, message, args) => {
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            message.channel.send("You are not allowed to use this sowwwwy. You need the `KICK_MEMBERS` permission.")
            return;
        }
        message.channel.send("Please wait... (The more infractions the longer this takes)").then(async (msg) => { 
       await mongo().then(async () => {
           try {
        let infractions = await infraction
        .find({ punishid: args[0] })

        if(infractions.length == 0){(
            message.channel.send(`No infractions were found with the specified id`));
            msg.delete()
            return;
        }

        await infraction.deleteOne({ punishid: args[0] }, )
        message.channel.send(`Punishment with ID ${args[0]} was successfully removed`)
        msg.delete()
        } finally {
            mongoose.connection.close();
        }
       })
    })
    }
    exports.help = {
        name: "rmpunish",
        aliases: [],
        description: "Remove a punishment",
        useage: "[infraction id] "
    }