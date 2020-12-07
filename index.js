require("dotenv").config();
const fs = require("fs");
const counting = require("./counting.js");
const Discord = require("discord.js");
const client = new Discord.Client();
const chalk = require("chalk");
const success = chalk.green;
const warn = chalk.yellow;
const error = chalk.bold.red;
const fetch = require("node-fetch");
const pjson = require("./package.json");
const embeds = require("./utilities/embeds");
const config = require("./config.json");
const vukkytils = require("./utilities/vukkytils");
const format = require("util").format;
const prefix = process.env.PREFIX;
client.commands = new Discord.Collection();
let updateRemindedOn = null;

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
let embedPermissions = 1;

console.log(`[${vukkytils.getString("STARTUP")}] ${vukkytils.getString("STARTING")}`);

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
	console.log(`[${vukkytils.getString("STARTUP")}] ${success(format(vukkytils.getString("STARTUP_FILE_LOADED"), file))}`);
}

const cooldowns = new Discord.Collection();

client.once("ready", () => {
	console.log(`[${vukkytils.getString("STARTUP")}] ${vukkytils.getString("READY")}`);
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
		"with SPAGHETTI",
		"with Vukkies",
		"with node-fetch",
		"with vukkyutils",
		"with discord.js",
		"Fall Guys",
		"Among Us",
		"Startup Panic",
		"Fortnite",
		"Cyberpunk 2077",
		"Portal 3",
		"GTA 6",
		"GTA 7",
		"Roblox 2",
		"Minecraft 2",
		"Roblox",
		"Minecraft",
		"osu!",
		"osu! 2",
		"Pixel Strike 3D",
		"Among Guys",
		"DropBlox",
		"with the cats",
		"Club Penguin",
		"you",
		"Baba is You",
		"Among Them"
	];
	setInterval(() => {
		const index = Math.floor(Math.random() * (statuses.length - 1) + 1);
		client.user.setActivity(`${statuses[index]} (${pjson.version})`);
	}, 15000);
	counting.start(client);
	if (config.updateChecker.enabled) {
		checkUpdates();
		setInterval(() => {
			checkUpdates();
		}, 7200000);
	}
});

function checkUpdates() {
	fetch("https://raw.githubusercontent.com/VukkyLtd/VukkyBot/master/package.json")  
		.then(res => res.json())
		.then(json => {
			if (json.version < pjson.version && updateRemindedOn !== json.version) {
				console.log(`${warn("Update available!")}`);
				updateRemindedOn = json.version;
				if (config.updateChecker.dmOwner) {
					for (let i = 0; i < config.misc.owner.length; i++) {
						client.users.fetch(config.misc.owner[i].toString())
							.then(owner => {
								owner.send(`Hello! I'm out of date. You're using VukkyBot **${pjson.version}**, but the latest version is VukkyBot **${json.version}**.\n*You have gotten this DM because you are an owner of this VukkyBot. DMing my owner(s) when an update is available is turned on.*`);
							});
					}
				}
			}
		});
}


client.on("message", message => {

	if ((message.channel.type == "text" && !message.guild.me.hasPermission("EMBED_LINKS"))) embedPermissions = 0;

	if (message.author.bot) return;

	if (message.content.toLowerCase().includes(`<@!${client.user.id}>`) && config.misc.prefixReminder == true && !message.content.startsWith(prefix)) message.reply(`my prefix is \`${process.env.PREFIX}\``);

	if (message.channel.name == config.counting.channelName) counting.check(message, client);

	if (!message.content.toLowerCase().startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command && config.misc.invalidCmdReminder) {
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
				break;
			}
			if ((message.channel.type == "text" && !message.guild.me.hasPermission(permissionsBot[i]))) {
				let reply = format(vukkytils.getString("BOT_PERMISSION_NEEDED"), permissionsBot[i]);
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
				break;
			}
			if ((message.channel.type == "text" && !message.member.hasPermission(command.userPermissions[i]))) {
				let reply = format(vukkytils.getString("BOT_PERMISSION_NEEDED"), command.userPermissions[i]);
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

client.on("messageDelete", message => {	
	if (message.channel.name == config.counting.channelName) {
		counting.deletion(message);
	}
});


client.login(process.env.BOT_TOKEN);
