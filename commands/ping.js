const { infoEmbed } = require("../embeds.js");

module.exports = {
	name: "ping",
	description: "Ping!",
	dcPermissions: ["EMBED_LINKS"],
	execute(message, args) {
		message.channel.send(infoEmbed("Pong."));
	},
};
