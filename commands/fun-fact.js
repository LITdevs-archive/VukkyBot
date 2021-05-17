const embeds = require("../utilities/embeds");

module.exports = {
	name: "fun-fact",
	description: "I sure do love fun facts!",
	botPermissions: ["EMBED_LINKS"],
	aliases: ["ff", "fun-fact", "did-you-know"],
	execute(message, args) {
		const factDB = require("./factdb.json");
		const item = factDB[Math.floor(Math.random() * factDB.length)];
		message.channel.send(embeds.funFactEmbed(item.fact, item.category, item.image, item.source));
	},
};