const embeds = require("../embeds.js");

module.exports = {
	name: 'roles',
	description: 'roles',
	dcPermissions: ['EMBED_LINKS', 'MANAGE_ROLES', 'ADD_REACTIONS'],
	execute(message, args) {
        if(message.member.hasPermission("KICK_MEMBERS")) {
            if(args[0] == 'add') {
                const user = message.mentions.members.first();
                const roleName = args.slice(2).join(' ');
                const role = message.guild.roles.cache.find(role => role.name === roleName);
                user.roles.add(role.id);
                message.react('👍')
            } else if (args[0] == 'remove') {
                const user = message.mentions.members.first();
                const roleName = args.slice(2).join(' ');
                const role = message.guild.roles.cache.find(role => role.name === roleName);
                user.roles.remove(role.id)
                message.react('👍')
            } else {
                embeds.errorEmbed('Invalid');
            }
        } else {
            embeds.infoEmbed("You don't have permission to do that.")
        }
	},
};