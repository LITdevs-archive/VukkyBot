const canvacord = require("canvacord").Canvas;
const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
	name: "rip",
	description: "rip",
	botPermissions: ["ATTACH_FILES", "MANAGE_MESSAGES"],
	usage: "[user]",
	async execute(message, args) {
		await message.react(config.misc.emoji.loading);
		let rip;
		if(message.mentions.users.size) {
			rip = await canvacord.rip(message.mentions.users.first().avatarURL({ format: "png" }));
		} else {
			rip = await canvacord.rip(message.author.avatarURL({ format: "png" }));
		}
		await message.reactions.removeAll();
		message.channel.send(new Discord.MessageAttachment(rip, "rip.png"));
	},
};
