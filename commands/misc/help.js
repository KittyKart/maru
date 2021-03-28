const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "help",
    description: "show the help command",
    execute(message, args, client) {
    if(!args[0]) {
        let e = new MessageEmbed()
        e.setTitle("Command categories")
        e.addField("Mod commands", "Type //help mod to view")
        e.addField("Misc commands", "Type //help misc to view")
        e.addField("NSFW commands", "Type //help nsfw to view")
        message.channel.send(e)
        return;
    }

    if(args[0] == "mod") {
        let e = new MessageEmbed()
        e.addField("`warn`", "Warn a user")
        e.addField("`kick`", "Kick a user")
        e.addField("`ban`", "Ban a user")
        e.addField("`rmpunish`", "Remove a punishment from a user")
        e.addField("`search`", "Check a users infractions")
        message.channel.send(e)
        return;
    }

    if(args[0] == "misc") {
        let e = new MessageEmbed()
        e.addField("`ping`", "Check the bot's ping")
        e.addField("`serverinfo`", "Check this server's info")
        message.channel.send(e)
        return;
    }


    if(args[0] == "image") {
        let e = new MessageEmbed()
        e.addField("`kiss`", "Kiss someone")
        e.addField("`meme`", "Fetch a meme")
        message.channel.send(e)
        return;
    }

    if(args[0] == "nsfw") {
        let e = new MessageEmbed()
        e.addField("`hentai`", "Fetch some hentai")
        e.addField("`thighs`", "Fetch some thighs")
        e.addField("`yaoi`", "Fetch some yaoi")
        e.addField("`fuck`", "Fuck someone")
        e.addField("`anal`", "Fetch some anal")
        message.channel.send(e)
        return;
    }

    }
}