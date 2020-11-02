const embeds = require("../embeds.js");

module.exports = {
	name: "mute",
	description: "Mute someone for being bad and annoying.",
	dcPermissions: ["EMBED_LINKS", "MANAGE_ROLES"],
	guildOnly: true,
	args: true,
	usage: "<@user>",
	execute(message, args) {
		var mentionedUser = message.guild.member(message.mentions.users.first());
		var muteReason = args.slice(1).join(" ") || "no reason specified";
		var authorHighestRole = message.member.roles.highest.position;
		var mentionHighestRole = mentionedUser.roles.highest.position;
		if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You need the Manage Roles permission to do that!");
		if (!mentionedUser) return message.channel.send("You need to provide a valid user.");
		if(mentionedUser.id === message.author.id) return message.channel.send("As much as I probably want you to shut the fuck up, I'm afraid I cannot do that.");
		if(mentionedUser.id === message.client.user.id) return message.channel.send(">:c");
		if(mentionedUser.user.bot === true && !mentionHighestRole >= authorHighestRole) message.channel.send("Thank you for letting me shut this idiot bot up!");
		if(mentionHighestRole >= authorHighestRole) return message.channel.send("You can't mute members with an equal or higher position than you.");
		if(!mentionedUser.kickable) return message.channel.send("This idiot won't let me shut them up.");

		message.channel.send(embeds.successEmbed("i still dont know how to mute people uwu"));

	}
};