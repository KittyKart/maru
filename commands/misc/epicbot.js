exports.run = async (client, message, args) => {
	let embed = new Discord.MessageEmbed()
		.setColor("RANDOM")
		.setTitle("Actually Good Bots")
		.setDescription(`Our Partners`)
		.addField("EpicBot", `A simple, multipurpose Discord bot. - [Invite](https://epic-bot.com/invite)`)
		.addField("Jaybot", `Sexiest Discord bot ever made. - [Invite](https://discord.com/oauth2/authorize?client_id=817932772424679434&scope=bot&permissions=8)`)
		message.channel.send(embed);
	};


exports.help = {
	name: "partners",
	aliases: [],
	description: "Sends invite to better bots",
	useage: ""
}
