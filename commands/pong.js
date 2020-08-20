const embeds = require("../embeds.js");

module.exports = {
	name: 'pong',
	description: 'Pong.',
	dcPermissions: ['EMBED_LINKS'],
	execute(message, args) {
		message.channel.send(embeds.infoEmbed(`Ping!`))
		message.channel.send(embeds.infoEmbed(`Pong.`))
	},
};
