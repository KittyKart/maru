const Discord = require('discord.js')
const client = new Discord.Client()
const { TOKEN, MONGOSTRING } = require("./config.json")
const fs = require('fs')
const mongoose = require('mongoose')
var prefix = "//"

client.on('ready', () => {
    console.log("Logged in")
    client.user.setActivity("your uwus", { type: "LISTENING"})
})

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try { 
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.channel.send('oopsie woopsie we made a fucky wucky running that command, i have alerted my developers <3');
	}
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to database!")
});

mongoose.connect(MONGOSTRING, { 
    useNewUrlParser: true, useUnifiedTopology: true
})
client.login(TOKEN)