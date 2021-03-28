const muteRole = require('../models/muteRole')
const mongo = require('../utils/mongo')

module.exports = {
    name: "muterole",
    description: "set the mute role",
    async execute(message, args, client) {
    if (!message.member.hasPermission("MANAGE_GUILD")) {
        message.channel.send("You need the permission `MANAGE_GUILD` to be able to run this command.");
        return;
    }

    if(!args[0]) {
        message.channel.send("Please send your muterole id")
        return;
    }
    if(isNaN(args[0])) {
        message.channel.send("Please make sure your sending the muterole id")
        return;
    }
    
    let roles = await muteRole
    .find({ guildid: message.guild.id })

    if(roles.length == 1) ( await muteRole.deleteOne({ guildid: message.guild.id }))
    if(roles.length == 1 ) { var msg = await message.channel.send("Updating...") }


    await mongo().then(async (mongoose) => {
        try {
            const newRole = {
            guildid: message.guild.id, 
            muteRole: args[0]
            }

            await new muteRole(newRole).save()
        } finally {
          msg.edit("Mute role set")
          mongoose.connection.close()
    }
    })
}
}
