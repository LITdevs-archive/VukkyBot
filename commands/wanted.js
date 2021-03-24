const canvacord = require("canvacord").Canvas;
const Discord = require("discord.js");

module.exports = {
	name: "wanted",
	description: "you are wanted! $5,000 reward!",
	botPermissions: ["ATTACH_FILES"],
	async execute(message, args) {
		const wanted = await canvacord.wanted(message.author.avatarURL({ format: "png" }));
		message.channel.send(new Discord.MessageAttachment(wanted, "trash.png"));
	},
};
