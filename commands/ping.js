module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, client) {
		message.channel.send(`🏓Latency is ${message.createdTimestamp - Date.now() }ms.`);
	},
};