const embeds = require("../utilities/embeds");

module.exports = {
	name: "pong",
	description: "Pong.",
	botPermissions: ["EMBED_LINKS"],
	execute(message, args) {
		message.channel.send(embeds.infoEmbed("Ping!"));
	},
};
