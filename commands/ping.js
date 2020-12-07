const { infoEmbed } = require("../utilities/embeds");

module.exports = {
	name: "ping",
	description: "Ping!",
	botPermissions: ["EMBED_LINKS"],
	execute(message, args) {
		message.channel.send(infoEmbed("Pong."));
	},
};
