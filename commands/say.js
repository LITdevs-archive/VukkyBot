const { prefix } = require('../crayons.json');
const embeds = require("../embeds.js");

module.exports = {
	name: 'say',
	description: 'Tell me to say something!',
	dcPermissions: ['EMBED_LINKS'],
  args: true,
  usage: '<message>',
	guildOnly: true,
	execute(message, args) {
		if (message.author.id === "282866197727543297") {
			let saymsg = message.content
      message.channel.send(embeds.infoEmbed(saymsg.replace(`${prefix}say`,"")))
      message.delete()
    } else {
      message.channel.send(embeds.infoEmbed("Nice try! You're not my creator though."))
    }
	},
};
