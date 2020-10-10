const embeds = require("../embeds.js");
const fetch = require('node-fetch');

module.exports = {
	name: 'duck',
	description: 'Get a nice duck!',
    dcPermissions: ['EMBED_LINKS'],
    aliases: ['ducks', 'random-duck'],
    usage: ['<optional: ducknumber.(jpg/gif)'],
	execute(message, args) {
        let fileType;
        let duckNumber;
        if(args[0].includes('gif')) fileType = "gif"
        if(args[0].includes('jpg') || !args[0].includes('gif') && !args[0].includes('jpg')) fileType = "jpg"
        if(args[0] && !args[0].includes('gif') && !args[0].includes('jpg')) duckNumber = args[0]
        if(args[0] && args[0].includes('gif') || args[0].includes('jpg')) duckNumber = args[0].slice(0, -4)
        message.channel.send("<a:offlinegif:757979855924101220> Hold on! I'm getting a duck for you... 🦆🦆🦆")
            .then(newMessage => {
                if(!args[0]) {
                    fetch('https://random-d.uk/api/v2/random')
                        .then(res => res.json())
                        .then(json => {
                            newMessage.edit(`Powered by random-d.uk`, embeds.duckEmbed(json.url))
                        })
                } else {
                    newMessage.edit(`Powered by random-d.uk`, embeds.duckEmbed(`https://random-d.uk/api/v2/${duckNumber}.${fileType}`))
                }
            })
	},
};