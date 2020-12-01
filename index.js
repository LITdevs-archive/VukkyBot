require("dotenv").config();
const fs = require("fs");
const counting = require("./counting");
const Discord = require("discord.js");
const client = new Discord.Client();
const chalk = require("chalk");
const success = chalk.green;
const warn = chalk.yellow;

const embeds = require("./embeds.js");
const config = require("./config.json");
const prefix = process.env.PREFIX;
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
let embedPermissions = 1;

console.log("[startup] VukkyBot is starting...");

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
	console.log(`[startup] ${success(`${file} loaded!`)}`);
}

const cooldowns = new Discord.Collection();

client.once("ready", () => {
	console.log(`[startup] ${success("Ready!")}`);
	const statuses = [
		"with JavaScript",
		"with a Fall Guy",
		"with counting bots",
		"with banning people",
		"with the console",
		"with pm2",
		"with npm",
		"with ESLint",
		"with MySQL",
		"SPAGHETTI"
	];
	setInterval(() => {
		const index = Math.floor(Math.random() * (statuses.length - 1) + 1);
		const pjson = require("./package.json");
		client.user.setActivity(`${statuses[index]} (${pjson.version})`);
	}, 10000);
	counting.start(client);
});

client.on("message", message => {

	if ((message.channel.type == "text" && !message.guild.me.hasPermission("EMBED_LINKS"))) embedPermissions = 0;

	if (message.author.bot) return;

	if (message.content.toLowerCase().includes(`<@!${client.user.id}>`) && config.misc.prefixReminder == true && !message.content.startsWith(prefix)) message.reply(`my prefix is \`${process.env.PREFIX}\``);

	if (message.channel.name == config.counting.channelName) counting.countCheck(message, client);

	if (!message.content.toLowerCase().startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) {
		let reply = `I've been looking around for a while now, but I don't think **${commandName}** is a command.`;
		if (embedPermissions == 0) return message.channel.send(reply);
		message.channel.send(embeds.errorEmbed(reply));
		return;
	}

	if(command.mysql && !config.misc.mysql) {
		if (embedPermissions == 0) return message.channel.send(`**${commandName}** is not enabled on this VukkyBot because MySQL is disabled!\nFor the hoster: See https://vukkyltd.github.io/VukkyBot/troubleshooting/mysqldisabled.html for instructions on how to enable it!`);
		return message.channel.send(embeds.errorEmbed(`**${commandName}** is not enabled on this VukkyBot because MySQL is disabled!\nFor the hoster: See [the VukkyBot Documentation site](https://vukkyltd.github.io/VukkyBot/troubleshooting/mysqldisabled.html) for instructions on how to enable it!`));
	}

	if (command.guildOnly && message.channel.type !== "text") {
		return message.channel.send(embeds.errorEmbed(`**${commandName}** cannot be used inside DMs.`));
	}

	if (command.args && !args.length) {
		let reply = `I expected you to give me some arguments for **${commandName}**, but I didn't see any.`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}
		if (embedPermissions == 0) return message.channel.send(reply);
		return message.channel.send(embeds.errorEmbed(reply));
	}

	function tempPermissionsBot(permissionsBot) {
		for (let i = 0, len = permissionsBot.length; permissionsBot; i < len, i++) {
			if (permissionsBot[i] == undefined) {
				if(!command.userPermissions) console.log(`[permcheck] ${success(`That should be it for ${prefix}${commandName}.`)}`);
				break;
			}
			console.log(`[permcheck] ${prefix}${commandName} wants bot to have ${permissionsBot[i]} - checking for permission...`);
			if ((message.channel.type == "text" && !message.guild.me.hasPermission(permissionsBot[i]))) {
				console.log(`[permcheck] Looks like someone forgot to give the bot ${permissionsBot[i]}.`);
				let reply = `Sorry, but I need the \`${permissionsBot[i]}\` permission to use that command.`;
				if (embedPermissions == 0) return message.channel.send(reply);
				message.channel.send(embeds.errorEmbed(reply));
				return;
			}
		}
	}

	if (command.dcPermissions) {
		console.log(`[permcheck] ${warn(`${prefix}${commandName} - dcPermissions is deprecated. Use botPermissions instead.`)}`);
		tempPermissionsBot(command.dcPermissions);
	} else if (command.botPermissions) {
		tempPermissionsBot(command.botPermissions);
	}

	if (command.userPermissions) {
		for (let i = 0, len = command.userPermissions.length; command.userPermissions; i < len, i++) {
			if (command.userPermissions[i] == undefined) {
				console.log(`[permcheck] ${success(`That should be it for ${prefix}${commandName}.`)}`);
				break;
			}
			console.log(`[permcheck] ${prefix}${commandName} wants user to have ${command.userPermissions[i]} - checking for permission...`);
			if ((message.channel.type == "text" && !message.member.hasPermission(command.userPermissions[i]))) {
				console.log(`[permcheck] Looks like the user doesn't have ${command.userPermissions[i]}.`);
				let reply = `Sorry, but you need the \`${command.userPermissions[i]}\` permission to use that command.`;
				if (embedPermissions == 0) return message.channel.send(reply);
				message.channel.send(embeds.errorEmbed(reply));
				return;
			}
		}
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.channel.send(embeds.cooldownEmbed(`You need to wait ${timeLeft.toFixed(1)} more second(s) before you can use the \`${command.name}\` command again.`));
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.log(`[${command.name}] ${error.message}`);
		message.reply("there was an error trying to execute that command!", embeds.errorEmbed(error.message));
	}
});

client.login(process.env.BOT_TOKEN);
