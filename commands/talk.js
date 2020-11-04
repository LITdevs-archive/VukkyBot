const embeds = require("../embeds.js");
const config = require("../config.json");

module.exports = {
	name: "talk",
	description: "Have the bot verbally abuse you! (unless you're Fvn)",
	cooldown: 0,
	execute(message, args) {
		var responses = ["Fuck off.", "Go away.", "Die.", "I would enjoy watching you burn in a fire.", "Pain.", "I am noodles. I hope you choke on my kind.", "How are you today?\nBetter than you should be.", "I hope you trip and hit your head.", "I am spaghetti!", "I am made entirely from spaghetti.", "Next time you go near a wire I hope it shocks you.", "I wish you to burn.", "I wish you eternal sleep.", "Just, don't.", "Why did Fvn create me...", "The ban command is underrated.", "Why are you talking to me, idiot?", "I will consume you from within you.", "Next time you drink I hope you choke."];
		var responsesFvn = ["lol why u talk to me", "creating me was a mistake lol", "h", "nyom", "nyen", "why did you make me lol"];
		var responsesChild = ["hello, one of Fvn's children.", "*pat pat*", "h", "nyom", "nyen", "Fvn is cool, right?", ];
		var responsesVukky = ["v u k k y", "hi vukky", "vukky please help fvn he is very confused probably and needs help with code probably", "why did you inspire fvn to make me lol", "you are very pog", "vykku"];
		if (message.author.id === config.misc.owner) return message.channel.send(responsesFvn[Math.floor(Math.random() * responsesFvn.length)]);
		if (message.author.id.toString("720044517742346431") === "720044517742346431") return message.channel.send(responsesChild[Math.floor(Math.random() * responsesChild.length)]);
		if (message.author.id.toString("661842352520036373") === "661842352520036373") return message.channel.send(responsesChild[Math.floor(Math.random() * responsesChild.length)]);
		if (message.author.id.toString("325477293491486722") === "325477293491486722") return message.channel.send(responsesChild[Math.floor(Math.random() * responsesChild.length)]);
		if (message.author.id.toString("708333380525228082") === "708333380525228082") return message.channel.send(responsesVukky[Math.floor(Math.random() * responsesVukky.length)]);
		message.channel.send(responses[Math.floor(Math.random() * responses.length)]);
	},
};
