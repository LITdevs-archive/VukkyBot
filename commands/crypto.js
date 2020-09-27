const embeds = require("../embeds.js");
const fetch = require('node-fetch');

module.exports = {
	name: 'crypto',
	description: 'Get crypto prices!',
    dcPermissions: ['EMBED_LINKS'],
    cooldown: 120,
    aliases: ['today'],
    args: true,
    usage: '<coin>',
	execute(message, args) {
        function checkStatus(res, newMessage) {
            if(res.status == 400) {
                return newMessage.edit(`<:error:759701620777943062> You messed up your input. Are you sure ${args[0].toUpperCase()} is a valid coin? The server returned 400.`)
            } else if (res.status == 502) {
                return newMessage.edit("<:error:759701620777943062> The server appears to be unavailable. Come back later. The server returned 502.")
            } else if (res.status = 429) {
                return newMessage.edit("<:error:759701620777943062> VukkyBot has been ratelimited from accessing the API. Come back later. The server returned 429.")
            } else {
                return newMessage.edit("<:error:759701620777943062> Something is broken!")
            }
        }
        message.channel.send("<a:offlinegif:757979855924101220> Hold on! I'm getting the data...")
            .then(newMessage => {
                fetch(`http://api.shruc.ml/saladlog/price?coin=${args[0].toLowerCase()}`)
                    .then(res => {
                        if(!res.ok) { checkStatus(res, newMessage) }
                        return res.json()
                    })
                    .then(json => {
                        newMessage.edit(`${json.RAW.FROMSYMBOL} is currently at $${json.RAW.PRICE}! This data was updated ${json.DISPLAY.LASTUPDATE.toLowerCase()}.\nThis API was brought to you by SharkOfGod!`)
                    })
            })
	},
};
