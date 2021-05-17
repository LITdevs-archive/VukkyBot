const canvacord = require("canvacord").Canvas;
const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
	name: "trash",
	description: "trash?",
	botPermissions: ["ATTACH_FILES", "MANAGE_MESSAGES"],
	usage: "[user]",
	async execute(message, args) {
		await message.react(config.misc.emoji.loading);
		let trash;
		if(message.mentions.users.size) {
			trash = await canvacord.trash(message.mentions.users.first().avatarURL({ format: "png" }));
		} else {
			trash = await canvacord.trash(message.author.avatarURL({ format: "png" }));
		}
		await message.reactions.removeAll();
		message.channel.send(new Discord.MessageAttachment(trash, "trash.png"));
	},
};
