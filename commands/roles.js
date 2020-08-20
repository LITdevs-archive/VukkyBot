const embeds = require("../embeds.js");

module.exports = {
	name: 'roles',
	description: 'Manage roles on your server',
   	dcPermissions: ['EMBED_LINKS', 'MANAGE_ROLES', 'ADD_REACTIONS'],
	guildOnly: true,
    	args: true,
    	usage: '<add/remove> <mention (for add/remove only)> <role name>',
    	aliases: ['role'],
	execute(message, args) {
		if(message.member.hasPermission("KICK_MEMBERS")) {
		    if(args[0] == 'add') {
			const user = message.mentions.members.first();
			const roleName = args.slice(2).join(' ');
			const role = message.guild.roles.cache.find(role => role.name === roleName);
			try {
				if(user.roles.cache.has(role.id)) return message.channel.send(embeds.infoEmbed(`<@!${user.id}> has the \`${roleName}\` role already.`))
				user.roles.add(role.id);
				message.channel.send(embeds.successEmbed(`Added the \`${roleName}\` role to <@!${user.id}>.`))
			} catch {
				message.channel.send(embeds.errorEmbed(`Could not add role. Does \`${roleName}\` actually exist?`))
			}
		    } else if (args[0] == 'remove') {
                const user = message.mentions.members.first();
                const roleName = args.slice(2).join(' ');
                const role = message.guild.roles.cache.find(role => role.name === roleName);
                try {
                    if(!user.roles.cache.has(role.id)) return message.channel.send(embeds.infoEmbed(`<@!${user.id}> doesn't have the \`${roleName}\` role.`))
                    user.roles.remove(role.id);
                    message.channel.send(embeds.successEmbed(`Removed the \`${roleName}\` role from <@!${user.id}>.`))
                } catch {
                    message.channel.send(embeds.errorEmbed(`Could not remove role. Does \`${roleName}\` actually exist?`))
                }			    
		    } else {
			message.channel.send(embeds.errorEmbed(`Invalid. The \`roles\` command only supports \`add/remove\`, not \`${args[0]}\`.`));
		    }
		} else {
		    message.channel.send(embeds.infoEmbed("You don't have permission to do that."))
		}
	},
};
