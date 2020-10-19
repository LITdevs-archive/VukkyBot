const embeds = require("../embeds.js");

module.exports = {
	name: "emoji",
	description: "Add and remove emojis with the help of VukkyBot!",
	dcPermissions: ["MANAGE_EMOJIS"],
	execute(message, args) {
		if (!message.member.permissions.has("MANAGE_EMOJIS")) return message.channel.send(embeds.errorEmbed("You need the Manage Emojis permission to run this command."));
		if (args[0] == "delete") {
			if(!message.guild.emojis.cache.get(args[1])) return message.channel.send(embeds.errorEmbed(`\`${args[1]}\` is not an emoji ID.`));
			let emoji = message.guild.emojis.cache.get(args[1]);
			emoji.delete({ reason: `Done by ${message.author.tag}` });
			message.channel.send(embeds.successEmbed(`\`${emoji.name}\` has been deleted!`));
		} else {
			return message.channel.send(embeds.errorEmbed(`${args[0]} is not supported for this command.`));
		}
	},
};