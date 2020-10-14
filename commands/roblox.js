const embeds = require("../embeds.js");
const fetch = require('node-fetch');

module.exports = {
	name: 'roblox',
	description: 'Interact with Roblox using VukkyBot!',
    dcPermissions: ['EMBED_LINKS'],
	execute(message, args) {
        message.channel.send("<a:offlinegif:757979855924101220> Hold on! I'm getting the data...")
            .then(newMessage => {
                if(args[0] == "search") {
                    fetch(`https://games.roblox.com/v1/games/list?model.keyword=${args.slice(1).join(' ')}`)
                        .then(res => res.json())
                        .then(json => {
                            if(!json.games[0]) {
                                newMessage.edit(`Sorry, but ROBLOX returned no results for that search.\nIt may have been filtered.`)
                            } else {
                                let game = json.games[0]
                                newMessage.edit(`I found **${game.name}**, made by ${game.creatorName}.\nIts ratings are 👍 ${game.totalUpVotes} and 👎 ${game.totalDownVotes}. Its player count right now is 👥 ${game.playerCount}.\nYou can play it at <https://roblox.com/games/${game.placeId}>.`)
                            }
                        })
                } else {
                    newMessage.edit(`Hold on! There's something wrong:`, embeds.errorEmbed("The argument you specified is not supported."))
                }
            })
	},
};
