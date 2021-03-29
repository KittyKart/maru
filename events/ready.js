const fetch = require('node-fetch')
const Discord = require('discord.js')
module.exports = (client, message) => {
    console.log("Logged in")
    client.user.setActivity("your uwus", { type: "LISTENING"})
    setInterval( function() {
        console.log("Hentai sent")
         fetch("https://api.neko-chxn.xyz/v1/fuck/img")
        .then(res => res.json())
        .then(body => {
            const e = new Discord.MessageEmbed()
            e.setDescription("<:mmm:813073983117066240> uwu")
            e.setImage(body.url)
            client.channels.cache.get("826192628079919114").send(e)
        })
  }, 3000)
}