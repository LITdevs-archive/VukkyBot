const canvacord = require("canvacord").Canvas;
const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
	name: "wanted",
	description: "you are wanted! $5,000 reward!",
	botPermissions: ["ATTACH_FILES", "MANAGE_MESSAGES"],
	usage: "[user]",
	async execute(message, args) {
		await message.react(config.misc.emoji.loading);
		let wanted;
		if(message.mentions.users.size) {
			wanted = await canvacord.wanted(message.mentions.users.first().avatarURL({ format: "png" }));
		} else {
			wanted = await canvacord.wanted(message.author.avatarURL({ format: "png" }));
		}
		await message.reactions.removeAll();
		message.channel.send(new Discord.MessageAttachment(wanted, "wanted.png"));
	},
};
