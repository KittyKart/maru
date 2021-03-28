module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, client) {
		message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms.`);
	},
};