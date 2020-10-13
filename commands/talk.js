const embeds = require("../embeds.js");

module.exports = {
	name: 'talk',
	description: 'Talk to VukkyBot and see what it says!',
	cooldown: 1,
	execute(message, args) {
        var responses = ['Hello.', 'Hi!', 'I like pineapple on pizza.', 'I don\'t want to talk right now.', 'I\'m bored.', 'I like noodles.', 'How are you today?\nI am *f i n e* personally.', '**Bad code** is my favorite type of food.', 'I love spaghetti!', 'I am made entirely from spaghetti.', 'Cable-managed PCs are cool!', 'My sanity is crumbling.', 'I am very tired!', 'Bow to Vukky!', '*skeleton noises*', 'The warn command is underrated.', 'How many times have I talked to you today?', 'I\'m very hungry! Do you have any food suggestions?', 'I\'m very thirsty! Do you have any drink suggestions?', 'Don\'t forget to drink water!', 'Woo woo!', 'Woo woo?', 'Woo woo woo, woo woo, woo woo woo woo.', '<a:vukkywave:760517823448612874>', '<a:vukkylook:760517823511527424>']
		message.channel.send(responses[Math.floor(Math.random() * responses.length)])
	},
};
