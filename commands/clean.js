const embeds = require("../embeds.js");

module.exports = {
	name: "clean",
	description: "Clean up some messages! VukkyBot can eat them for you.",
	dcPermissions: ["EMBED_LINKS", "MANAGE_MESSAGES"],
	args: true,
	usage: "<messages to clear>",
	aliases: ["clear", "wipe", "eat"],
	execute(message, args) {
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embeds.errorEmbed("You need the Manage Messages permission to run that command!"));
		if(parseInt(args[0]) < 1 || isNaN(parseInt(args[0]))) return message.channel.send(embeds.errorEmbed("You're so funny! But to eat messages, I need the amount of messages you want me to eat **in numbers** - and it should be greater than or equal to **1**."));
		if(parseInt(args[0]) > 99) return message.channel.send(embeds.errorEmbed("Sorry, I can only eat 99 messages at a time."));

		message.channel.bulkDelete(parseInt(args[0]) + 1).then(() => {
			message.channel.send(`Yummy! I ate ${args[0]} messages for you.`).then(msg => msg.delete({timeout: 2000}));
		});
	},
};
