const embeds = require("../embeds.js");
const config = require("../config.json");

module.exports = {
	name: "talk",
	description: "Have the bot verbally abuse you! (unless you're Fvn)",
	cooldown: 1,
	execute(message, args) {
		var responses = ["Fuck off.", "Go away.", "Die.", "I would enjoy watching you burn in a fire.", "Pain.", "I am noodles. I hope you choke on my kind.", "How are you today?\nBetter than you should be.", "I hope you trip and hit your head.", "I am spaghetti!", "I am made entirely from spaghetti.", "Next time you go near a wire I hope it shocks you.", "I wish you to burn.", "I wish you eternal sleep.", "Just, don't.", "Why did Fvn create me...", "The ban command is underrated.", "Why are you talking to me, idiot?", "I will consume you from within you.", "Next time you drink I hope you choke."];
		var responsesFvn = ["lol why u talk to me", "creating me was a mistake lol", "h", "nyom", "nyen", "why did you make me lol"];
		if (message.author.id === config.misc.owner) return message.channel.send(responsesFvn[Math.floor(Math.random() * responsesFvn.length)]);
		message.channel.send(responses[Math.floor(Math.random() * responses.length)]);
	},
};
