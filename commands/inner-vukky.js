const embeds = require("../utilities/embeds.js");
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
		} else {
			vukkyid = vn.convert(message.author.id);
			otherVukky = false;
		}
		message.channel.send(`<a:offlinegif:757979855924101220> Hold on! I'm discovering ${(otherVukky) ? "their" : "your"} inner Vukky!`)
			.then(newMessage => {	
				newMessage.edit(`${message.author}, here is ${(otherVukky) ? "their" : "your"} inner Vukky!`, embeds.innerEmbed(`https://sivusto.tk/innervukky/${vukkyid}.png`));
			});
	},
};
