const { infoEmbed } = require("../utilities/embeds");

module.exports = {
	name: "pong",
	description: "Pong.",
	botPermissions: ["EMBED_LINKS"],
	async execute(message, args) {
		const ping = await message.channel.send(infoEmbed("Ping!"));
		ping.edit(infoEmbed(`Ping! **${ping.createdTimestamp - message.createdTimestamp}ms**`));
	},
};
