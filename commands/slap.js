const embeds = require("../embeds.js");

module.exports = {
	name: "slap",
	description: "Slap someone!",
	dcPermissions: ["EMBED_LINKS"],
	args: true,
	usage: "<@user to slap>",
	execute(message, args) {
		if(!message.mentions.users.size) {
			message.channel.send(embeds.errorEmbed("You need to ping someone to use this command :("));
		} else {
			if (message.mentions.users.first().id === message.author.id) return message.channel.send("Nice one, idiot.");
			if (message.mentions.users.first().id === message.client.user.id) return message.channel.send("Don't even try.");
			message.channel.send(`<@${message.author.id}> slaps <@${message.mentions.users.first().id}>!`);
		}
	},
};
