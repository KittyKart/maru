const fetch = require('node-fetch')
const Discord = require('discord.js')
module.exports = (client, message) => {
    console.log("Logged in")
    client.user.setActivity("for //help", { type: "LISTENING"})
    
}