const canvacord = require("canvacord").Canvas;
const Discord = require("discord.js");

module.exports = {
	name: "rip",
	description: "rip",
	botPermissions: ["ATTACH_FILES"],
	async execute(message, args) {
		const rip = await canvacord.rip(message.author.avatarURL({ format: "png" }));
		message.channel.send(new Discord.MessageAttachment(rip, "rip.png"));
	},
};
