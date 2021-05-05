const canvacord = require("canvacord").Canvas;
const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
	name: "ohno",
	description: "oh no! it's stupid",
	botPermissions: ["ATTACH_FILES", "MANAGE_MESSAGES"],
	args: true,
	usage: "<text>",
	async execute(message, args) {
		await message.react(config.misc.emoji.loading);
		const ohno = await canvacord.ohno(args.slice(0).join(" "));
		await message.reactions.removeAll();
		message.channel.send(new Discord.MessageAttachment(ohno, "ohno.png"));
	},
};
