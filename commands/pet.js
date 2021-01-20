const embeds = require("../utilities/embeds");
const vukkytils = require("../utilities/vukkytils");
const format = require("util").format;

module.exports = {
	name: "pet",
	description: "Pet someone!",
	botPermissions: ["EMBED_LINKS"],
	args: true,
	usage: "<@user to pet>",
	execute(message, args) {
		if(!message.mentions.users.size) {
			message.channel.send(embeds.errorEmbed(vukkytils.getString("PING_REQUIRED")));
		} else {
			if (message.mentions.users.first().id === message.author.id) return message.channel.send(format(vukkytils.getString("CANT_USE_SELF"), vukkytils.getString("PET")));
			if (message.mentions.users.first().id === message.client.user.id) return message.channel.send(vukkytils.getString("BOT_LOVE"));
			message.channel.send(`<@${message.author.id}> pets <@${message.mentions.users.first().id}>!`);
		}
	},
};
