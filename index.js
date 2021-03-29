const Discord = require('discord.js')
const client = new Discord.Client()
const { TOKEN, MONGOSTRING } = require("./config.json")
const fs = require('fs')
const mongoose = require('mongoose')
const glob = require('glob')
const chalk = require('chalk')
var prefix = "//"



client.commands = new Discord.Collection();
client.help = new Discord.Collection();

fs.readdir("./events/", (err, files) => {
	if (err) return console.error(err);
  
	files.forEach((file) => {
	  if (!file.endsWith(".js")) return;
	  const event = require(`./events/${file}`);
	  let eventName = file.split(".")[0];
	  client.on(eventName, event.bind(null, client));
	  console.log(chalk.green(`[EVENT LOAD]`) + ` Loaded ${file}`);
	});
  });
  

  glob("./commands/**/*.js", (err, files) => {
	if (err) return console.error(err);
  
	files.forEach((file) => {
	  if (!file.endsWith(".js")) return;
	  try {
		const props = require(file);
		let commandName = props.help.name;
		let commandCategory = file.split("/")[2];
  
		if (client.commands.has(commandName)) {
		  console.log(
			chalk.yellow(`[COMMAND WARNING]`) +
			  ` ${commandName} has the same name as another command!`
		  );
		}
  
		let help = client.help.get(commandCategory);
		if (!help) {
		  client.help.set(commandCategory, [
			JSON.stringify({ name: commandName, help: props.help }),
		  ]);
		} else {
		  let newHelp = help.concat(
			JSON.stringify({ name: commandName, help: props.help })
		  );
		  client.help.set(commandCategory, newHelp);
		}
  
		client.commands.set(commandName, props);
		console.log(chalk.green(`[COMMAND LOAD]`) + ` Loaded command ${file}`);
	  } catch (e) {
		console.log(
		  chalk.red(`[COMMAND ERROR]`) + ` Error occured with ${file} error: ${e}`
		);
	  }
	});
  });
  

mongoose.connect(MONGOSTRING)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to database!")
});


client.login(TOKEN)