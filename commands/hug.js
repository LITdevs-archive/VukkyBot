const embeds = require("../embeds.js");
const vukkytils = require("../vukkytils.js");

module.exports = {
	name: "hug",
	description: "Hug someone!",
	botPermissions: ["EMBED_LINKS"],
	args: true,
	usage: "<@user to hug>",
	execute(message, args) {
		if(!message.mentions.users.size) {
			message.channel.send(embeds.errorEmbed("You need to ping someone to use this command :("));
		} else {
			if (message.mentions.users.first().id === message.author.id) return message.channel.send("You can't hug yourself! That would be silly.");
			if (message.mentions.users.first().id === message.client.user.id) return message.channel.send("Aww, thanks! ♥");
			let hugs = vukkytils.getString("HUG_TYPES");
			const format = require("util").format;
			message.channel.send(format(vukkytils.getString("GIVE_USER"), `<@!${message.author.id}>`, `<@!${message.mentions.users.first().id}>`, hugs[Math.floor(Math.random() * hugs.length)]));
		}
	},
};
