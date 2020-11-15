const embeds = require("../embeds.js");

module.exports = {
	name: "ban",
	description: "Ban someone",
	botPermissions: ["EMBED_LINKS", "BAN_MEMBERS"],
	guildOnly: true,
	args: true,
	usage: "<@user>",
	aliases: ["bean"],
	execute(message, args) {
		var mentionedUser = message.guild.member(message.mentions.users.first());
		var banReason = args.slice(1).join(" ") || "no reason specified";
		if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You need the Ban Members permission to do that!");
		if (!mentionedUser) return message.channel.send("You need to provide a valid user.");
		if(mentionedUser.id === message.author.id) return message.channel.send("You can't ban yourself! That would be silly.");
		if(mentionedUser.id === message.client.user.id) return message.channel.send(":(");
		if(mentionedUser.user.bot === true && !mentionHighestRole >= authorHighestRole) message.channel.send("Nooo! I don't want to ban my friends, but I guess I have to...");

		var authorHighestRole = message.member.roles.highest.position;
		var mentionHighestRole = mentionedUser.roles.highest.position;
		if(mentionHighestRole >= authorHighestRole) return message.channel.send("You can't ban members with an equal or higher position than you.");
		if(!mentionedUser.bannable) return message.channel.send("I can't ban this user.");

		mentionedUser.ban({reason: `Done by ${message.author.tag} - ${banReason}`})
			.then(user => message.channel.send(embeds.successEmbed(`Banned <@${user.id}> (${user.id}) from ${message.guild.name}, with the reason ${banReason}.`)));
	},
};
