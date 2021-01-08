const embeds = require("../utilities/embeds");
const fetch = require("node-fetch");
const config = require("../config.json");


module.exports = {
	name: "crypto",
	description: "Get crypto prices!",
	botPermissions: ["EMBED_LINKS"],
	cooldown: 15,
	args: true,
	usage: "<coin>",
	execute(message, args) {
		var checkStatusVar;
		function checkStatus(res, newMessage) {
			checkStatusVar = 1;
			if(res.status == 400) {
				return newMessage.edit(`${config.misc.emoji.error} Are you sure ${args[0].toUpperCase()} is a valid coin?`);
			} else if (res.status == 502) {
				return newMessage.edit(`${config.misc.emoji.error} The server appears to be unavailable. Come back later.`);
			} else if (res.status == 429) {
				return newMessage.edit(`${config.misc.emoji.error} VukkyBot has been ratelimited from accessing the API.`);
			} else {
				return newMessage.edit(`${config.misc.emoji.error} Something is broken!`);
			}
		}
		message.channel.send(`${config.misc.emoji.loading} Hold on! I'm getting the data...`)
			.then(newMessage => {
				fetch(`http://api.shruc.ml/saladlog/price?coin=${args[0].toLowerCase()}`)
					.then(res => {
						if(!res.ok) { 
							checkStatus(res, newMessage); 
						}
						return res.json();
					})
					.then(json => {
						try {
							newMessage.edit("Thanks to SharkOfGod for the API!", embeds.cryptoEmbed(json.RAW.FROMSYMBOL, json.RAW.PRICE, json.DISPLAY.LASTUPDATE.toLowerCase(), json.RAW.CHANGE24HOUR.toFixed(2)));
						} catch (error) {
							console.log(error.message);
							if(!checkStatusVar == 1) newMessage.edit(`${config.misc.emoji.error} Some funny stuff happened while attempting to display the data. Try again later. \`${error.message}\``);
							return;
						}
					});
			});
	},
};
