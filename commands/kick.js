const embeds = require("../embeds.js");
const config = require("../config.json");

module.exports = {
	name: "kick",
	description: "Kick someone",
	dcPermissions: ["EMBED_LINKS", "KICK_MEMBERS"],
	guildOnly: true,
	args: true,
	usage: "<@user>",
	execute(message, args) {
		var mentionedUser = message.guild.member(message.mentions.users.first());
		var kickReason = args.slice(1).join(" ") || "no reason specified";
		if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You need the Kick Members permission to do that!");
		if (!mentionedUser) return message.channel.send("You need to provide a valid user.");
		if(mentionedUser.id === message.author.id && message.author.id != config.author.id) return message.channel.send("As much as I want you outta here, I cannot do that.");
		if(mentionedUser.id === message.author.id && message.author.id === config.misc.owner) return message.channel.send("Fvn, I'm not having you kick yourself.");
		if(mentionedUser.id === message.client.user.id && message.author.id != config.misc.owner) return message.channel.send(">:c");
		if(mentionedUser.id === message.client.user.id && message.author.id === config.misc.owner) return message.channel.send(":(");
		if(mentionedUser.user.bot === true && !mentionHighestRole >= authorHighestRole) message.channel.send("Get outta here ya idiot bot!");

		var authorHighestRole = message.member.roles.highest.position;
		var mentionHighestRole = mentionedUser.roles.highest.position;
		if(mentionHighestRole >= authorHighestRole) return message.channel.send("You can't kick members with an equal or higher position than you.");
		if(!mentionedUser.kickable) return message.channel.send("I can't kick this person.");
		if(mentionedUser.id === config.misc.owner) {
			message.channel.send("Fvn what did you do...");
		}
		mentionedUser.kick(`Done by ${message.author.tag} - ${kickReason}`)
			.then(user => message.channel.send(embeds.successEmbed(`Kicked <@${user.id}> (${user.id}) from ${message.guild.name}, with the reason ${kickReason}.`)));
	},
};
