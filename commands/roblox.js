const embeds = require("../utilities/embeds");
const config = require("../config.json");
const fetch = require("node-fetch");
const commaNumber = require("comma-number");
const vukkytils = require("../utilities/vukkytils");

module.exports = {
	name: "roblox",
	description: "Interact with Roblox using VukkyBot!",
	botPermissions: ["EMBED_LINKS"],
	execute(message, args) {
		message.channel.send(`${config.misc.emoji.loading} ${vukkytils.getString("GETTING_DATA")}`)
			.then(newMessage => {
				fetch(`https://games.roblox.com/v1/games/list?model.keyword=${args.slice(0).join(" ")}`)
					.then(res => res.json())
					.then(json => {
						if(json.filteredKeyword) {
							newMessage.edit(`${config.misc.emoji.error} ROBLOX has filtered your search! Your search was \`${args.slice(0).join(" ")}\`, but it came out as \`${json.filteredKeyword}\`.\nAs such, VukkyBot cannot complete your search.`);
						} else if (!json.games[0]) {
							newMessage.edit(`${config.misc.emoji.error} Sorry, but ROBLOX returned no results for that search.`);
						} else {
							let game = json.games[0];
							let scoreEmoji = (game.totalUpVotes - game.totalDownVotes > 0) ? "😃" : "🙁";
							let playerEmoji = (game.playerCount == 0) ? "👀" : (game.playerCount == 1) ? "👤" : "👥";
							newMessage.edit(`*Is this result unexpected? VukkyBot currently only supports searching games.*\nI found **${game.name}**, made by ${game.creatorName}.\nIts ratings are 👍 ${commaNumber(game.totalUpVotes)} and 👎 ${commaNumber(game.totalDownVotes)}, thus it has a score of ${scoreEmoji} ${commaNumber(game.totalUpVotes - game.totalDownVotes)}.\nIts player count right now is ${playerEmoji} ${commaNumber(game.playerCount)}.\nYou can play it at <https://roblox.com/games/${game.placeId}>.`);
						}
					});
			});
	},
};
