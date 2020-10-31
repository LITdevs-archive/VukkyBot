const { successEmbed, errorEmbed } = require("../embeds.js");
const embeds = require("../embeds.js");

module.exports = {
	name: "emoji",
	description: "Add and remove emojis with the help of VukkyBot!",
	dcPermissions: ["MANAGE_EMOJIS"],
	args: true,
	guildOnly: true,
	execute(message, args) {
		if (!message.member.permissions.has("MANAGE_EMOJIS")) return message.channel.send(embeds.errorEmbed("You need the Manage Emojis permission to run this command."));
		
		if (args[0] == "add") {
			if (message.attachments.size > 0) {
				if (args.length >= 2) {
					if (args[1].length >= 2) {
						let RegExp = /[^a-z^A-Z^0-9]/gm;
						if (!RegExp.test(args[1])) {
							message.guild.emojis.create((message.attachments).array()[0].url, args[1])
								.then(emoji => message.channel.send(successEmbed(`Created new emoji with name ${emoji.name}`)))
								.catch(error => message.channel.send(errorEmbed(`Error: ${error.message}`)));
						} else {
							message.channel.send(errorEmbed("I found symbols that are not suitable for the name of the emoji!"));
						}
					} else {
						message.channel.send(errorEmbed("The name of the emoji must be longer than 2 letters!"));
					}
				} else {
					message.channel.send(errorEmbed("You didn't give me enough arguments!\nUsage:`emoji add <emojiName>` with an image as attachment."));
				}
			} else {
				message.channel.send(errorEmbed("You didn't give me enough arguments!\nUsage:`emoji add <emojiName>` with an image as attachment."));
			}
		} else {
			if (args[0] == "delete") {
				if(!message.guild.emojis.cache.get(args[1])) return message.channel.send(embeds.errorEmbed(`\`${args[1]}\` is not an emoji ID.`));
				let emoji = message.guild.emojis.cache.get(args[1]);
				emoji.delete({ reason: `Done by ${message.author.tag}` });
				message.channel.send(embeds.successEmbed(`\`${emoji.name}\` has been deleted!`));
			} else {
				return message.channel.send(embeds.errorEmbed(`${args[0]} is not supported for this command.`));
			}
		}
		
	},
};
