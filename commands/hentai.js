const fetch = require('node-fetch')

module.exports = {
    name: "hentai",
    description: "fetch hentai",
    async execute(message, args, client) {
    if(message.channel.nsfw == false) {
        message.channel.send("HEY! THIS CHANNEL ISN'T NSFW. PLEASE SET CHANNEL TO NSFW YOUR HORNY FUCK")
        return;
        }

    fetch("https://shiro.gg/api/images/nsfw/hentai")
    .then(res => res.json())
    .then(body => message.channel.send(body.url))
    }
}