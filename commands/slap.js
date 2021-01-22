const embeds = require("../utilities/embeds");
const vukkytils = require("../utilities/vukkytils");
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
			if (message.mentions.users.first().id === message.author.id) return message.channel.send(vukkytils.getString("CANT_SLAP_SELF"));
			if (message.mentions.users.first().id === message.client.user.id) return message.channel.send(vukkytils.getString("BOT_PAIN"));
			message.channel.send(format(vukkytils.getString("GIVE_USER"), `<@!${message.author.id}>`, `<@!${message.mentions.users.first().id}>`, vukkytils.getString("SLAP_TYPES")));
		}
	},
};
