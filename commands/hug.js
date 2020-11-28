const embeds = require("../embeds.js");
const vukkytils = require("../vukkytils.js");
const format = require("util").format;

module.exports = {
	name: "hug",
	description: "Hug someone!",
	botPermissions: ["EMBED_LINKS"],
	args: true,
	usage: "<@user to hug>",
	execute(message, args) {
		if(!message.mentions.users.size) {
			message.channel.send(embeds.errorEmbed(vukkytils.getString("PING_REQUIRED")));
		} else {
			if (message.mentions.users.first().id === message.author.id) return message.channel.send(format(vukkytils.getString("CANT_USE_SELF"), vukkytils.getString("HUG")));
			if (message.mentions.users.first().id === message.client.user.id) return message.channel.send(vukkytils.getString("BOT_LOVE"));
			let hugs = vukkytils.getString("HUG_TYPES");
			message.channel.send(format(vukkytils.getString("GIVE_USER"), `<@!${message.author.id}>`, `<@!${message.mentions.users.first().id}>`, hugs[Math.floor(Math.random() * hugs.length)]));
		}
	},
};
