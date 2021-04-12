const embeds = require("../utilities/embeds");
const vukkytils = require("../utilities/vukkytils");

module.exports = {
	name: "kick",
	description: "Kick someone",
	botPermissions: ["EMBED_LINKS", "KICK_MEMBERS"],
	userPermissions: ["KICK_MEMBERS"],
	guildOnly: true,
	args: true,
	usage: "<@user>",
	cooldown: 0,
	execute(message, args) {
		var mentionedUser = message.guild.member(message.mentions.users.first());
		var kickReason = args.slice(1).join(" ") || "no reason specified";
		if (!mentionedUser) return message.channel.send(vukkytils.getString("PING_REQUIRED"));
		if(mentionedUser.id === message.author.id) return message.channel.send(vukkytils.getString("CANT_KICK_SELF"));
		if(mentionedUser.id === message.client.user.id) return message.channel.send(vukkytils.getString("BOT_PAIN"));
		if(mentionedUser.user.bot === true && !mentionHighestRole >= authorHighestRole) message.channel.send("Nooo! I don't want to kick my friends, but I guess I have to...");

		var authorHighestRole = message.member.roles.highest.position;
		var mentionHighestRole = mentionedUser.roles.highest.position;
		if(mentionHighestRole >= authorHighestRole) return message.channel.send("You can't kick members with an equal or higher position than you.");
		if(!mentionedUser.kickable) return message.channel.send("I can't kick this user.");

		mentionedUser.send(`👢 Hi! You got kicked from **${message.guild.name}**${(kickReason !== "no reason specified") ? ` for ${kickReason}.` : "."}`)
			.then(() => iHateThis())
			.catch(() => iHateThis());
		
		function iHateThis() {
			mentionedUser.kick(`Done by ${message.author.tag} - ${kickReason}`)
				.then(message.channel.send(embeds.successEmbed(`Kicked <@${mentionedUser.id}> (${mentionedUser.id}) from **${message.guild.name}**${(kickReason !== "no reason specified") ? `, for ${kickReason}.` : "."}`)));
		}
	},
};
