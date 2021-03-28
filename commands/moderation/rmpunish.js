const infraction = require('../models/infraction')
const mongoose = require('mongoose')
const { Message } = require('discord.js')
module.exports = {
    name: 'rmpunish',
    description: "remove a punishment",
    async execute(message, args, client) {
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            message.channel.send("You are not allowed to use this sowwwwy. You need the `KICK_MEMBERS` permission.")
            return;
        }

        let infractions = await infraction
        .find({ punishid: args[0] })

        if(infractions.length == 0){(
            message.channel.send(`No infractions were found with the specified id`));
            return;
        }

        await infraction.deleteOne({ punishid: args[0] }, )
        message.channel.send(`Punishment with ID ${args[0]} was successfully removed`)

    }
}