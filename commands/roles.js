const embeds = require("../embeds.js");

module.exports = {
	name: 'roles',
	description: 'roles',
   	dcPermissions: ['EMBED_LINKS', 'MANAGE_ROLES', 'ADD_REACTIONS'],
    	args: true,
    	usage: '<add/remove> <mention> <role name>',
    	aliases: ['role'],
	execute(message, args) {
		if(message.member.hasPermission("KICK_MEMBERS")) {
		    if(args[0] == 'add') {
			const user = message.mentions.members.first();
			const roleName = args.slice(2).join(' ');
			const role = message.guild.roles.cache.find(role => role.name === roleName);
			if(!role.id) return message.channel.send(embeds.errorEmbed("Could not get role ID. Does that role exist?"))
			user.roles.add(role.id);
			message.react('👍')
		    } else if (args[0] == 'remove') {
			const user = message.mentions.members.first();
			const roleName = args.slice(2).join(' ');
			const role = message.guild.roles.cache.find(role => role.name === roleName);
			if(!role.id) return message.channel.send(embeds.errorEmbed("Could not get role ID. Does that role exist?"))
			user.roles.remove(role.id)
			message.react('👍')
		    } else {
			message.channel.send(embeds.errorEmbed(`Invalid. The \`roles\` command only supports \`add/remove\`, not \`${args[0]}\`.`));
		    }
		} else {
		    message.channel.send(embeds.infoEmbed("You don't have permission to do that."))
		}
	},
};
