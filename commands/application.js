const embeds = require("../embeds.js");

module.exports = {
	name: 'application',
	description: 'Accept and deny moderator applications',
	dcPermissions: ['EMBED_LINKS', 'MANAGE_ROLES'],
	execute(message, args) {
		if(args[0] == "accept") {
			message.channel.send("wow")
		else if (args[0] == "decline") {
		      message.channel.send("oh no")
		} else {
			message.channel.send(embeds.errorEmbed(`This command only supports \`accept/decline\`, not \`args[0]\`.`)
		}
	},
};
