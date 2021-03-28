const fetch = require('node-fetch')

module.exports = {
    name: "boobs",
    description: "fetch some boobs",
    async execute(message, args, client) {
    
    if(message.channel.nsfw == false) {
        message.channel.send("HEY! THIS CHANNEL ISN'T NSFW. PLEASE SET CHANNEL TO NSFW YOUR HORNY FUCK")
        return;
    }
    
    fetch("https://nekos.life/api/v2/img/boobs")
    .then(res => res.json())
    .then(body => message.channel.send(body.url))

    
    }
}