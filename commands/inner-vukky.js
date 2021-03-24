const embeds = require("../utilities/embeds.js");
const config = require("../config.json");
const vn = require("../utilities/vukkynumber");
const vukkytils = require("../utilities/vukkytils");
const format = require("util").format;

module.exports = {
	name: "inner-vukky",
	description: "Discover your inner Vukky!",
	botPermissions: ["EMBED_LINKS"],
	cooldown: 5,
	aliases: ["innervukky"],
	async execute(message, args) {
		let mode;
		try {
			let vukkyid;
			// eslint-disable-next-line no-inner-declarations
			function self() {
				mode = "self";
				vukkyid = vn.convert(message.author.id);
				message.channel.send(`${config.misc.emoji.loading} ${vukkytils.getString("DISCOVERING_VUKKY")}`)
					.then(newMessage => {	
						newMessage.edit(format(vukkytils.getString("DISCOVERED_VUKKY"), message.author), embeds.innerEmbed(`https://sivusto.tk/innervukky/${vukkyid}.png`));
					});
			}
			if(message.mentions.users.first()) {
				if(message.mentions.users.first().id == message.author.id) {
					self();
				} else {
					vukkyid = vn.convert(message.mentions.users.first().id);
					mode = "mentioned";
					message.channel.send(`${config.misc.emoji.loading} ${format(vukkytils.getString("DISCOVERING_OTHER_VUKKY"), message.mentions.users.first().username)}`)
						.then(newMessage => {	
							newMessage.edit(format(vukkytils.getString("DISCOVERED_OTHER_VUKKY"), message.author, message.mentions.users.first().username), embeds.innerEmbed(`https://sivusto.tk/innervukky/${vukkyid}.png`));
						});
				}
			} else if (args[0] && !message.mentions.users.first()) { 
				mode = "id";
				await message.client.users.fetch(args[0]).then(function (res) {
					vukkyid = vn.convert(res.id);
					message.channel.send(`${config.misc.emoji.loading} ${format(vukkytils.getString("DISCOVERING_OTHER_VUKKY"), res.username)}`)
						.then(newMessage => {	
							newMessage.edit(format(vukkytils.getString("DISCOVERED_OTHER_VUKKY"), message.author, res.username), embeds.innerEmbed(`https://sivusto.tk/innervukky/${vukkyid}.png`));
						});
				});
			} else {
				self();
			}
		} catch (e) {
			if(mode == "id") {
				message.channel.send(`${config.misc.emoji.error} ${vukkytils.getString("INNER_VUKKY_USER_FETCH_ERROR")}`);
			} else {
				message.channel.send(`${config.misc.emoji.error} ${vukkytils.getString("INNER_VUKKY_ERROR")}`);
			}
			console.error(e);
		}
	},
};
