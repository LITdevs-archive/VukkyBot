const embeds = require("../embeds.js");
const config = require("../config.json");

module.exports = {
	name: "slap",
	description: "Slap someone!",
	dcPermissions: ["EMBED_LINKS"],
	args: true,
	usage: "<@user to slap>",
	execute(message, args) {
		if(!message.mentions.users.size) {
			message.channel.send(embeds.errorEmbed("You need to choose someone to slap, idiot."));
		} else {
			if (message.mentions.users.first().id === message.author.id && message.author.id != config.misc.owner) return message.channel.send("Nice one, idiot.");
			if (message.mentions.users.first().id === message.author.id && message.author.id === config.misc.owner) return message.channel.send("Fvn don't.");
			if (message.mentions.users.first().id === message.client.user.id && message.author.id != config.misc.owner) return message.channel.send("Don't even try.");
			if (message.mentions.users.first().id === message.client.user.id && message.author.id === config.misc.owner) return message.channel.send(":(");
			if (message.mentions.users.first().id === config.misc.owner && message.author.id != config.misc.owner) return message.channel.send("Don't slap Fvn! >:c");
			message.channel.send(`<@${message.author.id}> slaps <@${message.mentions.users.first().id}>!`);
		}
	},
};
