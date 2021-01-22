const embeds = require("../utilities/embeds");
const vukkytils = require("../utilities/vukkytils");
const format = require("util").format;

module.exports = {
	name: "clean",
	description: "Clean up some messages! VukkyBot can eat them for you.",
	botPermissions: ["EMBED_LINKS", "MANAGE_MESSAGES"],
	userPermissions: ["MANAGE_MESSAGES"],
	args: true,
	guildOnly: true,
	usage: "<messages to clear>",
	aliases: ["clear", "wipe", "eat"],
	execute(message, args) {
		if(parseInt(args[0]) < 1 || isNaN(parseInt(args[0]))) return message.channel.send(embeds.errorEmbed("You're so funny! But to eat messages, I need the amount of messages you want me to eat **in numbers** - and it should be greater than or equal to **1**."));
		if(parseInt(args[0]) > 99) return message.channel.send(embeds.errorEmbed("Sorry, I can only eat 99 messages at a time."));

		message.channel.bulkDelete(parseInt(args[0]) + 1).then(() => {
			message.channel.send(format(vukkytils.getString("CLEANED_MESSAGES"), args[0])).then(msg => msg.delete({timeout: 2000}));
		});
	},
};
