const embeds = require("../embeds.js");
const fetch = require("node-fetch");
const commaNumber = require("comma-number");

module.exports = {
	name: "roblox",
	description: "Interact with Roblox using VukkyBot!",
	dcPermissions: ["EMBED_LINKS"],
	execute(message, args) {
		message.channel.send("<a:offlinegif:757979855924101220> Hold on! I'm getting the data...")
			.then(newMessage => {
				if(args[0] == "search") {
					fetch(`https://games.roblox.com/v1/games/list?model.keyword=${args.slice(1).join(" ")}`)
						.then(res => res.json())
						.then(json => {
							if(json.filteredKeyword) {
								newMessage.edit(`ROBLOX has filtered your search! Your search was \`${args.slice(1).join(" ")}\`, but it came out as \`${json.filteredKeyword}\`.\nAs such, VukkyBot cannot complete your search.`);
							} else if (!json.games[0]) {
								newMessage.edit("Sorry, but ROBLOX returned no results for that search.");
							} else {
								let game = json.games[0];
								let scoreEmoji = (game.totalUpVotes - game.totalDownVotes > 0) ? "😃" : "🙁";
								let playerEmoji = (game.playerCount == 0) ? "👀" : (game.playerCount == 1) ? "👤" : "👥";
								newMessage.edit(`*Is this result unexpected? VukkyBot currently only supports searching games.*\nI found **${game.name}**, made by ${game.creatorName}.\nIts ratings are 👍 ${commaNumber(game.totalUpVotes)} and 👎 ${commaNumber(game.totalDownVotes)}, thus it has a score of ${scoreEmoji} ${commaNumber(game.totalUpVotes - game.totalDownVotes)}.\nIts player count right now is ${playerEmoji} ${commaNumber(game.playerCount)}.\nYou can play it at <https://roblox.com/games/${game.placeId}>.`);
							}
						});
				} else {
					newMessage.edit("Hold on! There's something wrong:", embeds.errorEmbed("The argument you specified is not supported."));
				}
			});
	},
};
