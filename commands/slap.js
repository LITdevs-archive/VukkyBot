const embeds = require("../embeds.js");

module.exports = {
	name: 'slap',
	description: 'Slap someone!',
    dcPermissions: ['EMBED_LINKS'],
    args: true,
    usage: '<@user to slap>',
	execute(message, args) {
		if(!message.mentions.users.size) {
            message.channel.send(embeds.errorEmbed("You need to ping someone to use this command :("))
        } else {
            message.channel.send(`<@${message.author.id}> slaps <@${message.mentions.users.first().id}>!`)
        }
	},
};
