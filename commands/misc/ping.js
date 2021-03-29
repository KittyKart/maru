exports.run = async (client, message, args) => {
		message.channel.send(`🏓Latency is ${message.createdTimestamp - Date.now()}ms.`);
	};


exports.help = {
	name: "ping",
	aliases: [],
	description: "",
	useage: ""
}