require("dotenv").config();
const prefix = process.env.BOT_PREFIX;
const embeds = require("../utilities/embeds");
const Discord = require("discord.js");

module.exports = {
	name: "help",
	description: "List all of my commands or info about a specific command.",
	aliases: ["commands"],
	usage: "[command name]",
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			data.push("Here's a list of all my commands:");
			data.push(commands.map(command => command.name).join(", "));
			data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === "dm") return;
					message.channel.send(embeds.successEmbed("I've sent you a DM with all my commands!"));
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.channel.send(embeds.errorEmbed("Looks like I can't DM you. Do you have your DMs disabled?"));
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.channel.send(embeds.errorEmbed(`I've been looking around for a while now, but I don't think **${name}** is a command.`));
		}

		const helpEmbed = new Discord.MessageEmbed()
			.setColor("#4b83c3")
			.setTitle(`ℹ ${command.name}`)
			.setDescription(command.description)
			.setTimestamp()
			.setFooter(embeds.versionString, embeds.avatarURL);

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) helpEmbed.addField("Aliases", `${command.aliases.join(", ")}`, true);
		if (command.usage) helpEmbed.addField("Usage", `${prefix}${command.name} ${command.usage}`, true);
		helpEmbed.addField("Cooldown", `${command.cooldown || 3} second(s)`, true);
		if (command.userPermissions) helpEmbed.addField("User permissions required", `${command.userPermissions.join(", ")}`, true);
		if (command.botPermissions) helpEmbed.addField("Bot permissions required", `${command.botPermissions.join(", ")}`, true);

		message.channel.send(helpEmbed);
	},
};
