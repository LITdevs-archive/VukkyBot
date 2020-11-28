const embeds = require("../embeds.js");
const vukkytils = require("../vukkytils.js");
const format = require("util").format;

module.exports = {
	name: "slap",
	description: "Slap someone!",
	botPermissions: ["EMBED_LINKS"],
	args: true,
	usage: "<@user to slap>",
	execute(message, args) {
		if(!message.mentions.users.size) {
			message.channel.send(embeds.errorEmbed(vukkytils.getString("PING_REQUIRED")));
		} else {
			if (message.mentions.users.first().id === message.author.id) return message.channel.send(format(vukkytils.getString("CANT_USE_SELF"), vukkytils.getString("SLAP")));
			if (message.mentions.users.first().id === message.client.user.id) return message.channel.send(vukkytils.getString("BOT_PAIN"));
			message.channel.send(`<@${message.author.id}> slaps <@${message.mentions.users.first().id}>!`);
		}
	},
};
