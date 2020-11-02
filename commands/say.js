const embeds = require("../embeds.js");


const config = require("../config.json");
const { guildOnly } = require("./kick.js");
const { Guild } = require("discord.js");

module.exports = {
	name: "say",

	description: "Make VukkyBot say things!",
	dcPermissions: ["EMBED_LINKS", "MANAGE_MESSAGES"],
	execute(message, args) {
		if(message.author.id.toString(125644326037487616) == "125644326037487616") {
			message.channel.send("go the fuck away from me ville");
	
		} else {
			if(message.author.id != config.misc.owner) {
				message.channel.send(embeds.errorEmbed("Don't even try to make me say shit unless you're Fvn."));
			} else {
				let say = args.slice(0).join(" ");
				message.delete();
				message.channel.send(say);
			}
			

		}
	},
};