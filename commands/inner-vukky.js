const embeds = require("../utilities/embeds.js");
const config = require("../config.json");
const fetch = require("node-fetch");
const vn = require("../utilities/vukkynumber");
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
			message.channel.send(`${config.misc.emoji.loading} Hold on! I'm discovering **${message.mentions.users.first().username}**'s inner Vukky!`)
				.then(newMessage => {	
					newMessage.edit(`${message.author}, here is **${message.mentions.users.first().username}**'s inner Vukky!`, embeds.innerEmbed(`https://sivusto.tk/innervukky/${vukkyid}.png`));
				});
		} else if (args[0]) { 
			message.client.users.fetch(args[0]).then(function (res) {
				vukkyid = vn.convert(res.id);
				otherVukky = true;
				message.channel.send(`${config.misc.emoji.loading} Hold on! I'm discovering **${res.username}**'s inner Vukky!`)
					.then(newMessage => {	
						newMessage.edit(`${message.author}, here is **${res.username}**'s inner Vukky!`, embeds.innerEmbed(`https://sivusto.tk/innervukky/${vukkyid}.png`));
					});
			});
		} else {
			vukkyid = vn.convert(message.author.id);
			otherVukky = false;
			message.channel.send(`${config.misc.emoji.loading} Hold on! I'm discovering your inner Vukky!`)
				.then(newMessage => {	
					newMessage.edit(`${message.author}, here is your inner Vukky!`, embeds.innerEmbed(`https://sivusto.tk/innervukky/${vukkyid}.png`));
				});
		}
	},
};
