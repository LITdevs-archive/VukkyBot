const canvacord = require("canvacord").Canvas;
const Discord = require("discord.js");

module.exports = {
	name: "ohno",
	description: "oh no! it's stupid",
	botPermissions: ["ATTACH_FILES"],
	async execute(message, args) {
		const ohno = await canvacord.ohno(args.slice(0).join(" "));
		message.channel.send(new Discord.MessageAttachment(ohno, "ohno.png"));
	},
};
