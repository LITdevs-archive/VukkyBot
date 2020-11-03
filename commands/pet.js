const config = require("../config.json");
const embeds = require("../embeds.js");

module.exports = {
	name: "pet",
	description: "Pet someone!",
	dcPermissions: ["EMBED_LINKS"],
	args: true,
	usage: "<@user to pet>",
	execute(message, args) {
		if(!message.mentions.users.size) {
			message.channel.send(embeds.errorEmbed("You need to ping someone to use this command :("));
		} else {
			if (message.mentions.users.first().id === message.author.id && message.author.id != config.misc.owner) return message.channel.send("Petting yourself is a true sign of loneliness. I feel bad for you.");
			if (message.mentions.users.first().id === message.author.id && message.author.id === config.misc.owner) return message.channel.send("Fvn, don't.");
			if (message.mentions.users.first().id === message.client.user.id && message.author.id != config.misc.owner) return message.channel.send("Thanks, but you should've pet Fvn instead...");
			if (message.mentions.users.first().id === message.client.user.id && message.author.id === config.misc.owner) return message.channel.send("Fvn just pet me!! Yay!!!");
			if (message.mentions.users.first().id === "468242178880176129") return message.channel.send(`<@${message.author.id}> pets <@${message.mentions.users.first().id}>! Ty for petting Fvn!!`);
			if (message.author.id === config.misc.owner) return message.channel.send(`Woah!! Fvn just pet <@${message.mentions.users.first().id}>! Luckyyyyy`);
			message.channel.send(`<@${message.author.id}> pets <@${message.mentions.users.first().id}>! But why are you petting someone other than Fvn...`);
		}
	},
};
