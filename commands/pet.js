const embeds = require("../embeds.js");

module.exports = {
	name: "pet",
	description: "Pet someone!",
	botPermissions: ["EMBED_LINKS"],
	args: true,
	usage: "<@user to pet>",
	execute(message, args) {
		if(!message.mentions.users.size) {
			message.channel.send(embeds.errorEmbed("You need to ping someone to use this command :("));
		} else {
			if (message.mentions.users.first().id === message.author.id) return message.channel.send("You can't pet yourself! That would be silly.");
			if (message.mentions.users.first().id === message.client.user.id) return message.channel.send("Aww, thanks! ♥");
			message.channel.send(`<@${message.author.id}> pets <@${message.mentions.users.first().id}>!`);
		}
	},
};
