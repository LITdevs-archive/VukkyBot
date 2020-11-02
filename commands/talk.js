const embeds = require("../embeds.js");

module.exports = {
	name: "talk",
	description: "Have the bot verbally abuse you!",
	cooldown: 1,
	execute(message, args) {
		var responses = ["Fuck off.", "Go away.", "Die.", "I would enjoy watching you burn in a fire.", "Pain.", "I am noodles. I hope you choke on my kind.", "How are you today?\nBetter than you should be.", "I hope you trip and hit your head.", "I am spaghetti!", "I am made entirely from spaghetti.", "Next time you go near a wire I hope it shocks you.", "I wish you to burn.", "I wish you eternal sleep.", "Just, don't.", "Fvn is dumb.", "The ban command is underrated.", "Why are you talking to me, idiot?", "I will consume you from within you.", "Next time you drink I hope you choke."];
		message.channel.send(responses[Math.floor(Math.random() * responses.length)]);
	},
};
