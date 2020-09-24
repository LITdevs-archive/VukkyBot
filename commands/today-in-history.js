const embeds = require("../embeds.js");
const fetch = require('node-fetch');

module.exports = {
	name: 'today-in-history',
	description: 'Find out what happened today in history!',
    dcPermissions: ['EMBED_LINKS'],
    cooldown: 120,
    aliases: ['today'],
	execute(message, args) {
        message.channel.send("<a:offlinegif:757979855924101220> Hold on! I'm getting the data...")
            .then(newMessage => {
                fetch('https://history.muffinlabs.com/date')
                    .then(res => res.json())
                    .then(json => {
                        var result = json['data']['Events'][Math.floor(Math.random() * json['data']['Events'].length)]
                        newMessage.edit(`It's **${json.date}** today!\nI am not responsible for any inappropiate content here. This information is pulled from Wikipedia, via https://history.muffinlabs.com.\n\n**${result.year}**: ${result.text}`)
                    })
            })
	},
};
