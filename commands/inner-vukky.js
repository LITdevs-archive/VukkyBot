const embeds = require("../embeds.js");
const fetch = require("node-fetch");
const vn = require("../vukkynumber.js");
module.exports = {
	name: "inner-vukky",
	description: "Discover your inner Vukky!",
	botPermissions: ["EMBED_LINKS"],
	cooldown: 5,
	execute(message, args) {
		let vukkyid = vn.convert(message.author.id);
		message.channel.send("<a:offlinegif:757979855924101220> Hold on! I'm discovering your inner Vukky!")
			.then(newMessage => {	
				newMessage.edit(embeds.innerVukkyEmbed(`https://sivusto.tk/innervukky/${vukkyid}.png`, message.author));
			});
	},
};
