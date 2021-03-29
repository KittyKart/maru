exports.run = async (client, message, args) => {
		message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms.`);
	};


exports.help = {
	name: "ping",
	aliases: [],
	description: "",
	useage: ""
}
