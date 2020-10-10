const embeds = require("../embeds.js");
const fetch = require('node-fetch');

module.exports = {
	name: 'duck',
	description: 'Get a nice duck!',
    dcPermissions: ['EMBED_LINKS'],
    aliases: ['ducks', 'random-duck'],
	execute(message, args) {
        if(args[0]) return message.channel.send(`FYI: Getting a specific duck is not currently supported.\nHowever, you may want to try <https://random-d.uk/api/v2/${args[0]}.jpg> or <https://random-d.uk/api/v2/${args[0]}.gif>.`)
        message.channel.send("<a:offlinegif:757979855924101220> Hold on! I'm getting a duck for you... 🦆🦆🦆")
            .then(newMessage => {
                fetch('https://random-d.uk/api/v2/random')
                    .then(res => res.json())
                    .then(json => {
                        newMessage.edit(`${json.message}`, embeds.duckEmbed(json.url))
                    })
            })
	},
};