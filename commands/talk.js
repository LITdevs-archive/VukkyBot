const embeds = require("../embeds.js");

module.exports = {
	name: 'talk',
	description: 'Talk to VukkyBot and see what it says!',
	execute(message, args) {
        var responses = ['Hello.', 'Hi!', 'I like pineapple on pizza.', 'I don\'t want to talk right now.', 'I\'m bored.', 'I like noodles.', 'How are you today?\nI am *f i n e* personally.', '**Bad code** is my favorite type of food.', 'I love spaghetti!']
		message.channel.send(responses[Math.floor(Math.random() * responses.length)])
	},
};
