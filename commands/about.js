const embeds = require("../embeds.js");
const packagejson = require("../package.json");
var os = require('os');

module.exports = {
	name: 'about',
	description: 'Get information about this VukkyBot!',
    dcPermissions: ['EMBED_LINKS'],
    aliases: ['info'],
	execute(message, args) {
		message.channel.send(embeds.aboutEmbed(packagejson.version, packagejson.dependencies["discord.js"].substring(1), `${os.type().replace(/_/g, " ")} ${os.release}`))
	},
};
