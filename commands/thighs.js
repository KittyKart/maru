const fetch = require('node-fetch')

module.exports = {
    name: "thighs",
    description: "fetch thighs",
    async execute(message, args, client) {
    if(message.channel.nsfw == false) {
        message.channel.send("HEY! THIS CHANNEL ISN'T NSFW. PLEASE SET CHANNEL TO NSFW YOUR HORNY FUCK")
        }

    fetch("https://shiro.gg/api/images/nsfw/thighs")
    .then(res => res.json())
    .then(body => message.channel.send(body.url))
    }
}