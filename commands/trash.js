const canvacord = require("canvacord").Canvas;
const Discord = require("discord.js");

module.exports = {
	name: "trash",
	description: "trash?",
	botPermissions: ["ATTACH_FILES"],
	async execute(message, args) {
		const trash = await canvacord.trash(message.author.avatarURL({ format: "png" }));
		message.channel.send(new Discord.MessageAttachment(trash, "trash.png"));
	},
};
