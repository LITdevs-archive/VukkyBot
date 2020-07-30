const { prefix } = require('../crayons.json');
const embeds = require("../embeds.js");

module.exports = {
	name: 'log',
	description: 'Add something to the log',
	dcPermissions: ['EMBED_LINKS', 'MANAGE_MESSAGES'],
  	args: true,
  	usage: '<message>',
	guildOnly: true,
	execute(message, args) {
		if (message.author.id === "282866197727543297") {
			let saymsg = message.content
			saymsg = saymsg.replace(`${prefix}log`,"")
			console.log(saymsg)
			message.delete()
		} else {
			message.channel.send(embeds.infoEmbed("Nice try! You're not my creator though. ||I bet you tried to rickroll me.||"))
		}
	},
};
