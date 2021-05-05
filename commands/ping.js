const { infoEmbed } = require("../utilities/embeds");

module.exports = {
	name: "ping",
	description: "Ping!",
	botPermissions: ["EMBED_LINKS"],
	async execute(message, args) { // no idea, but this works
		const ping = await message.channel.send(infoEmbed("Pong."));
		ping.edit(infoEmbed(`Pong! **${ping.createdTimestamp - message.createdTimestamp}ms**`));
	},
};
