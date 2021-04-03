const embeds = require("../utilities/embeds");
const config = require("../config.json");

module.exports = {
	name: "say",
	description: "Make VukkyBot say things!",
	botPermissions: ["EMBED_LINKS", "MANAGE_MESSAGES"],
	cooldown: 0,
	execute(message, args) {
		if(!config.misc.owner.includes(message.author.id)) {
			message.channel.send(embeds.errorEmbed("Sorry, but you're not an owner of this VukkyBot."));
		} else {
			let say = args.slice(0).join(" ");
			message.delete();
			message.channel.send("not pissy");
		}
	},
};
