// Copyright (C) 2020-2021 Vukky

const embeds = require("../utilities/embeds");
const vukkytils = require("../utilities/vukkytils");

module.exports = {
	name: "fun-fact",
	description: "I sure do love fun facts!",
	botPermissions: ["EMBED_LINKS"],
	aliases: ["ff", "fun-fact", "did-you-know"],
	execute(message, args) {
		const factDB = vukkytils.getStrings(`../strings/funfact/${vukkytils.language}`);
		const item = factDB[Math.floor(Math.random() * factDB.length)];
		message.channel.send(embeds.funFactEmbed(item.fact, item.category, item.image, item.source));
	},
};