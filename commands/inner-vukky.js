const embeds = require("../utilities/embeds.js");
const config = require("../config.json");
const fetch = require("node-fetch");
const vn = require("../utilities/vukkynumber");
const vukkytils = require("../utilities/vukkytils");
const format = require("util").format;
module.exports = {
	name: "inner-vukky",
	description: "Discover your inner Vukky!",
	botPermissions: ["EMBED_LINKS"],
	cooldown: 5,
	aliases: ["innervukky"],
	execute(message, args) {
		let vukkyid;
		let otherVukky;
		if(message.mentions.users.first() && message.mentions.users.first().id !== message.author.id) {
			vukkyid = vn.convert(message.mentions.users.first().id);
			otherVukky = true;
			// message.mentions.users.first().username
			message.channel.send(`${config.misc.emoji.loading} ${format(vukkytils.getString("DISCOVERING_OTHER_VUKKY"), message.mentions.users.first().username)}`)
				.then(newMessage => {	
					newMessage.edit(format(vukkytils.getString("DISCOVERED_OTHER_VUKKY"), message.mentions.users.first().username), embeds.innerEmbed(`https://sivusto.tk/innervukky/${vukkyid}.png`));
				});
		} else if (args[0]) { 
			message.client.users.fetch(args[0]).then(function (res) {
				vukkyid = vn.convert(res.id);
				otherVukky = true;
				message.channel.send(`${config.misc.emoji.loading} ${format(vukkytils.getString("DISCOVERING_OTHER_VUKKY"), res.username)}`)
					.then(newMessage => {	
						newMessage.edit(format(vukkytils.getString("DISCOVERED_OTHER_VUKKY"), res.username), embeds.innerEmbed(`https://sivusto.tk/innervukky/${vukkyid}.png`));
					});
			});
		} else {
			vukkyid = vn.convert(message.author.id);
			otherVukky = false;
			message.channel.send(`${config.misc.emoji.loading} ${vukkytils.getString("DISCOVERING_VUKKY")}`)
				.then(newMessage => {	
					newMessage.edit(format(vukkytils.getString("DISCOVERED_VUKKY"), message.author), embeds.innerEmbed(`https://sivusto.tk/innervukky/${vukkyid}.png`));
				});
		}
	},
};
