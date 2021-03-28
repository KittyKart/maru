module.exports = {
    name: "kick",
    description: "kick a member from the server",
    async execute(client, message, args) {
        if (!message.author.hasPermission("KICK_MEMBERS")) {
            message.channel.send("You are not allowed to use this sowwwwy. You need the `KICK_MEMBERS` permission.")
            return;
        }
        if(!args[0]) {
            message.channel.send("Please specify someone to kick uwu.")
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

        message.channel.send(`User kicked with infraction ID ${punishID}`)

        let modID = message.author.id

        let guildid = message.guild.id

        let date = moment().format('MMMM Do YYYY, h:mm A (AT)')

        const mongo = require('../utils/mongo')
        const infraction = require('../models/infraction')

        member.kick({ reason: reason });

        await mongo().then(async (mongoose) => {
        try {
            const kick = {
            userid: memberID,
            guild:  guildid,
            punishid: punishID,
            type: "Kick",
            time: date,
            modid: modID,
            reason: reason,
            }

            await new infraction(kick).save()
        } finally {
          mongoose.connection.close()
        }
        
    })

    }
}