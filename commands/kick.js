const embeds = require("../embeds.js");

module.exports = {
	name: 'kick',
	description: 'Kick someone',
    dcPermissions: ['EMBED_LINKS', 'KICK_MEMBERS'],
    guildOnly: true,
    args: true,
    usage: "<@user>",
	execute(message, args) {
        var mentionedUser = message.guild.member(message.mentions.users.first())
        var kickReason = args.slice(1).join(' ') || "no reason specified";
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You need the Kick Members permission to do that!")
        if (!mentionedUser) return message.channel.send("You need to provide a valid user.")
        if(mentionedUser.id === message.author.id) return message.channel.send('You can\'t kick yourself! That would be silly.');
        if(mentionedUser.id === message.client.user.id) return message.channel.send(':(');
        if(mentionedUser.user.bot === true) message.channel.send('Nooo! I don\'t want to kick my friends, but I guess I have to...')

        var authorHighestRole = message.member.roles.highest.position;
        var mentionHighestRole = mentionedUser.roles.highest.position;
        if(mentionHighestRole >= authorHighestRole) return message.channel.send('You can\'t kick members with an equal or higher position than you.');
        if(!mentionedUser.kickable) return message.channel.send('I can\'t kick this user.');

        mentionedUser.kick(`Done by ${message.author.tag} - ${kickReason}`)
            .then(user => message.channel.send(embeds.successEmbed(`Kicked <@${user.id}> (${user.id}) from ${message.guild.name}, with the reason ${kickReason}.`)))
	},
};
