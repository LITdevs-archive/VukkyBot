const canvacord = require("canvacord").Canvas;
const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
	name: "opinion",
	description: "father's son makes an opinion",
	botPermissions: ["ATTACH_FILES", "MANAGE_MESSAGES"],
	args: true,
	usage: "[user] <text>",
	async execute(message, args) {
		await message.react(config.misc.emoji.loading);
		let opinion;
		if(message.mentions.users.size) {
			opinion = await canvacord.opinion(message.mentions.users.first().avatarURL({ format: "png" }), args.slice(1).join(" "));
		} else {
			opinion = await canvacord.opinion(message.author.avatarURL({ format: "png" }), args.slice(0).join(" "));
		}
		await message.reactions.removeAll();
		message.channel.send(new Discord.MessageAttachment(opinion, "opinion.png"));
	},
};
