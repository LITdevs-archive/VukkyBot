const embeds = require("../utilities/embeds");
const config = require("../config.json");

module.exports = {
	name: "say",
	description: "Make VukkyBot say things!",
	botPermissions: ["EMBED_LINKS", "MANAGE_MESSAGES"],
	cooldown: 0,
	botOwnerOnly: true,
	execute(message, args) {
		let say = args.slice(0).join(" ");
		message.delete();
		message.channel.send(say);
	},
};
