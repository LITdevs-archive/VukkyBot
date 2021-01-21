const embeds = require("../utilities/embeds");
const config = require("../config.json");
const fetch = require("node-fetch");
const vukkytils = require("../utilities/vukkytils");
const format = require("util").format;

module.exports = {
	name: "duck",
	description: "Get a nice duck!",
	botPermissions: ["EMBED_LINKS"],
	aliases: ["ducks", "random-duck"],
	usage: ["<optional: ducknumber.(jpg/gif)"],
	execute(message, args) {
		let fileType;
		let duckNumber;
		if(args[0]) {
			if(args[0].includes("gif")) fileType = "gif";
			if(args[0].includes("jpg") || !args[0].includes("gif") && !args[0].includes("jpg")) fileType = "jpg";
			if(args[0] && !args[0].includes("gif") && !args[0].includes("jpg")) duckNumber = args[0];
			if(args[0] && args[0].includes("gif") || args[0].includes("jpg")) duckNumber = args[0].slice(0, -4);
		}
		message.channel.send(`${config.misc.emoji.loading} ${vukkytils.getString("DUCK_FINDING")}`)
			.then(newMessage => {
				if(!args[0]) {
					fetch("https://random-d.uk/api/v2/random")
						.then(res => res.json())
						.then(json => {
							newMessage.edit(format(vukkytils.getString("API_CREDIT"), "https://random-d.uk"), embeds.duckEmbed(json.url));
						});
				} else {
					newMessage.edit(format(vukkytils.getString("API_CREDIT"), "https://random-d.uk"), embeds.duckEmbed(`https://random-d.uk/api/v2/${duckNumber}.${fileType}`));
				}
			});
	},
};