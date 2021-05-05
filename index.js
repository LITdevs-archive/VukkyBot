// Copyright (C) 2019-2021 Vukky, Gravity Assist, Skelly

require("dotenv").config();
const fs = require("fs");
const counting = require("./counting.js");
const Discord = require("discord.js");
const ora = require("ora");
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION", "USER"]});
<<<<<<< HEAD
const chalk = require("chalk");
//const success = chalk.green;
//const warn = chalk.yellow;    //all of thease seem to do nothing, why
//const error = chalk.bold.red;
//const info = chalk.blue;
=======
>>>>>>> d20eb45fc01b12ff3b16288cb3e398b6f61eefb1
const fetch = require("node-fetch");
const pjson = require("./package.json");
const embeds = require("./utilities/embeds");
const config = require("./config.json");
const vukkytils = require("./utilities/vukkytils");
const format = require("util").format;
const prefix = process.env.BOT_PREFIX;
client.commands = new Discord.Collection();
let updateRemindedOn = null;
const chokidar = require("chokidar");
const chalk = require("chalk");

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
let embedPermissions = 1;

console.clear();
console.log(`[${vukkytils.getString("STARTUP")}] ${vukkytils.getString("STARTING")}`);

<<<<<<< HEAD
//bot startup 
const commandSpinner = ora(`${vukkytils.getString("STARTUP_LOADING_COMMANDS")}\n`).start();
commandSpinner.prefixText = `[${vukkytils.getString("STARTUP")}]`;
commandSpinner.spinner = "point";	
commandSpinner.render();
let commandsToLoad = commandFiles.length;
for (const file of commandFiles) {
	commandsToLoad--;
	commandSpinner.text = `${format(vukkytils.getString("STARTUP_LOADING_SPECIFIC_COMMAND"), file, commandFiles.indexOf(file), commandFiles.length)}\n`;
	try {
		commandSpinner.render();
		const command = require(`./commands/${file}`);
		client.commands.set(command.name, command);
		if (!command.name) {
			commandSpinner.fail(`Couldn't load ${file}: No name`);
			process.exit(1);
		} else if (!command.execute) {
			commandSpinner.fail(`Couldn't load ${file}: No execute function`);
			process.exit(1);
=======
async function checkUpdates(forStartup) {
	const updateChecker = ora("Checking for updates...").start();
	updateChecker.prefixText = forStartup == true ? `[${vukkytils.getString("STARTUP")}]` : "[updater]";
	updateChecker.spinner = "point";
	updateChecker.render();
	fetch("https://raw.githubusercontent.com/VukkyLtd/VukkyBot/master/package.json")  
		.then(res => res.json())
		.then(json => {
			if (json.version > pjson.version && updateRemindedOn !== json.version) {
				updateChecker.warn(`${json.version} is now available!`);
				console.log(`[updater] https://github.com/VukkyLtd/VukkyBot/releases/tag/${json.version}`);
				updateRemindedOn = json.version;
				if (config.updateChecker.dmOwner) {
					for (let i = 0; i < config.misc.owner.length; i++) {
						client.users.fetch(config.misc.owner[i].toString())
							.then(owner => {
								owner.send(`Hello! I'm out of date. You're using VukkyBot **${pjson.version}**, but the latest version is VukkyBot **${json.version}**.\nhttps://github.com/VukkyLtd/VukkyBot/releases/tag/${json.version}\n*You have gotten this DM because you are an owner of this VukkyBot. DMing my owner(s) when an update is available is turned on.*`);
							});
					}
				}
				return true;
			} else {
				updateChecker.info("No new updates available.");
				if(forStartup == true) commandPrep(true);
				return false;
			}
		});
}

function commandPrep(forStartup) {
	const commandSpinner = ora(`${vukkytils.getString("STARTUP_LOADING_COMMANDS")}\n`).start();
	commandSpinner.prefixText = `[${vukkytils.getString("STARTUP")}]`;
	commandSpinner.spinner = "shark";
	commandSpinner.render();
	let commandsLoaded = 0;
	for (const file of commandFiles) {
		commandSpinner.text = `${format(vukkytils.getString("STARTUP_LOADING_SPECIFIC_COMMAND"), file, commandFiles.indexOf(file), commandFiles.length)}\n`;
		try {
			commandSpinner.render();
			const command = require(`./commands/${file}`);
			client.commands.set(command.name, command);
			if (!command.name) {
				commandSpinner.fail(`Couldn't load ${file}: No name`);
				process.exit(1);
			} else if (!command.execute) {
				commandSpinner.fail(`Couldn't load ${file}: No execute function`);
				process.exit(1);
			}
		} catch (error) {
			commandSpinner.fail(`Couldn't load ${file}: ${error.message}`);
			throw error;
		}
		commandsLoaded++;
		if(commandsLoaded == commandFiles.length) {
			commandSpinner.succeed(vukkytils.getString("STARTUP_COMMANDS_LOADED"));
			if(forStartup == true) login();
>>>>>>> d20eb45fc01b12ff3b16288cb3e398b6f61eefb1
		}
	}
}

if(config.updateChecker.enabled) {
	checkUpdates(true);
} else {
	commandPrep(true);
}

const cooldowns = new Discord.Collection();

client.once("ready", async () => {
	console.log(`\n[${vukkytils.getString("STARTUP")}] ${format(vukkytils.getString("READY"), pjson.version)}\n`);
	if(!process.env.BOT_PREFIX && process.env.PREFIX) console.log(`[${vukkytils.getString("STARTUP")}] ${vukkytils.getString("ENV_PREFIX_RENAMED")}`);
	const statuses = [
		"with JavaScript",
		"with a Vukky",
		"with counting bots",
		"with banning people",
		"with the console",
		"with npm",
		"with ESLint",
		"with MySQL",
		"with SPAGHETTI",
		"with the Vukkies",
		"with node-fetch",
		"with vukkyutils",
		"with discord.js",
		"Fall Guys",
		"Among Us",
		"Fortnite",
		"Roblox",
		"Minecraft",
		"osu!",
		"Pixel Strike 3D",
		"Among Guys",
		"DropBlox",
		"Club Penguin",
		"Baba is You",
		"Vukkyland",
		"Elemental on Discord",
		"Genshin Impact",
		"VALORANT",
		"Terraria",
		"The Game (i lost)",
		"RuneLite",
		"RuneScape",
		"Old School RuneScape",
		"on Funorb",

	];
	client.user.setActivity(`with the world (${pjson.version})`);
	setInterval(() => {
		const index = Math.floor(Math.random() * (statuses.length - 1) + 1);
		client.user.setActivity(`${statuses[index]} (${pjson.version})`);
	}, 15000);
	counting.start(client);
	if (config.updateChecker.enabled) {
		setInterval(() => {
			checkUpdates();
		}, 7200000);
	}
	chokidar.watch("commands/*.js", {ignoreInitial: true}).on("all", (event, path) => {
		path = path.substr(path.lastIndexOf("\\") + 1);
		if(event == "add") {
			const commandSpinner = ora(`Loading ${path}\n`).start();
			commandSpinner.prefixText = "[autoreload]";
			commandSpinner.spinner = "point";
			try {
				const command = require(`./commands/${path}`);
				client.commands.set(command.name, command);
				commandSpinner.succeed(`Loaded ${path}`);
			} catch (error) {
				commandSpinner.fail(`Couldn't load ${path}: ${error.message}`);
				throw error;
			}
		} else if (event == "change") {
			const commandSpinner = ora(`Reloading ${path}\n`).start();
			commandSpinner.prefixText = "[autoreload]";
			commandSpinner.spinner = "point";	
			try {
				delete require.cache[require.resolve(`./commands/${path}`)];
				const command = require(`./commands/${path}`);
				client.commands.set(command.name, command);
				commandSpinner.succeed(`Reloaded ${path}`);
			} catch (error) {
				commandSpinner.fail(`Couldn't reload ${path}: ${error.message}`);
				throw error;
			}
		}
	});
	embeds.setAvatarURL(client.user.displayAvatarURL());
	if(config.misc.mysql) {
		if(!process.env.SQL_HOST || !process.env.SQL_PASS || !process.env.SQL_USER || !process.env.SQL_DB) {
			console.log(`[mysql] ${chalk.bold.red(vukkytils.getString("MYSQL_MISSING_CREDENTIALS"))}`);
		}
	}
});

const inviteSites = ["discord.gg/", "discord.com/invite/", "discordapp.com/invite/", "discord.co/invite/", "watchanimeattheoffice.com/invite/", "discord.media/invite/"];
client.on("message", async message => {
	if (message.author.bot) return;
	if ((message.channel.type == "text" && !message.guild.me.hasPermission("EMBED_LINKS"))) embedPermissions = 0;
	if (message.content.toLowerCase().includes(`<@!${client.user.id}>`) && config.misc.prefixReminder == true && !message.content.startsWith(prefix)) message.channel.send(`Hi ${message.author}! Do you need help? Just type \`${process.env.BOT_PREFIX}help\`, and I'll send you all my commands!\nYou have to put \`${process.env.BOT_PREFIX}\` before the name of a command in order to make it work.`);
	if (message.channel.name == config.counting.channelName) counting.check(message, client);

	if (inviteSites.some(site => message.content.includes(site)) && config.moderation.automod.allowInviteLinks == false && !message.member.roles.cache.some(r => config.moderation.automod.allowInviteLinksBypassRoles.includes(r.id))) {
		message.delete();
		message.channel.send(format(vukkytils.getString("DISCORD_INVITES_DISABLED_AUTOMOD"), message.author)).then(msg => setTimeout(() => msg.delete(), 7000));
	}

	// Send auto responses configured in config.moderation.automod.autoResponses 
	if(config.moderation.automod.autoResponses.enabled && config.moderation.automod.autoResponses.responses[message.content.toLowerCase()]) {
		let autoResponse = config.moderation.automod.autoResponses.responses[message.content.toLowerCase()];
		if(autoResponse.text && !autoResponse.embed) {
			message.channel.send(autoResponse.text);
		} else if (autoResponse.embed && Object.keys(autoResponse.embed).length > 0) {
			let embed = new Discord.MessageEmbed();
			if(autoResponse.embed.title) embed.setTitle(autoResponse.embed.title);
			if(autoResponse.embed.description) embed.setDescription(autoResponse.embed.description);
			if(autoResponse.embed.url) embed.setURL(autoResponse.embed.url);
			if(autoResponse.embed.footer) embed.setFooter(autoResponse.embed.footer);
			if(autoResponse.text) {
				message.channel.send(autoResponse.text, embed);
			} else {
				message.channel.send(embed);
			}
		} else {
			message.channel.send("There's something wrong with this auto response! Contact the VukkyBot owner or server administrator.");
		}
	}

	if (!message.content.toLowerCase().startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (commandName == "") return;

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	// Make sure the command exists
	if (!command) {
		if(config.misc.invalidCmdReminder) {
			let reply = format(vukkytils.getString("COMMAND_INVALID"), `**${commandName}**`);
			if (embedPermissions == 0) return message.channel.send(reply);
			message.channel.send(embeds.errorEmbed(reply));
		}
		return;
	}

	// Handle various exports
	const requiredAPIs = {
		mysql: config.misc.mysql == true,
		twitter: process.env.TWITTER_KEY != undefined && process.env.TWITTER_SECRET != undefined && process.env.TWITTER_ACCESS != undefined && process.env.TWITTER_ACCESS_SECRET != undefined
	};
	if(command.requiredAPIs) {
		if(command.requiredAPIs.includes("mysql") && !requiredAPIs.mysql) {
			if (embedPermissions == 0) return message.channel.send(`**${commandName}** is not enabled on this VukkyBot because it needs access to MySQL, but MySQL is disabled.\nFor the hoster: See https://vukkyltd.github.io/VukkyBot/troubleshooting/mysqldisabled.html for instructions on how to enable it!`);
			return message.channel.send(embeds.errorEmbed(`**${commandName}** is not enabled on this VukkyBot because it needs access to MySQL, but MySQL is disabled.\nFor the hoster: See [the VukkyBot Documentation site](https://vukkyltd.github.io/VukkyBot/troubleshooting/mysqldisabled.html) for instructions on how to enable it!`));
		}
		if(command.requiredAPIs.includes("twitter") && !requiredAPIs.twitter) {
			if (embedPermissions == 0) return message.channel.send(`**${commandName}** is not enabled on this VukkyBot because it needs access to the Twitter API, but I don't have access to the Twitter API...`);
			return message.channel.send(embeds.errorEmbed(`**${commandName}** is not enabled on this VukkyBot because it needs access to the Twitter API, but I don't have access to the Twitter API...`));
		}
	}

	if(command.disabled) {
		let errorMsg = `**${commandName}** is disabled.`;
		if (embedPermissions == 0) return message.channel.send(errorMsg);
		return message.channel.send(embeds.errorEmbed(errorMsg));
	}

	if(command.botOwnerOnly && !config.misc.owner.includes(message.author.id)) {
		let errorMsg = format(vukkytils.getString("COMMAND_BOT_OWNER_ONLY"), `**${commandName}**`);
		if (embedPermissions == 0) return message.channel.send(errorMsg);
		return message.channel.send(embeds.errorEmbed(errorMsg));
	}

	if (command.guildOnly && message.channel.type == "dm") {
		return message.channel.send(embeds.errorEmbed(format(vukkytils.getString("COMMAND_GUILD_ONLY"), `**${commandName}**`)));
	}

	if (command.args && !args.length) {
		let reply = `I expected you to give me some arguments for **${commandName}**, but I didn't see any.`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}
		if (embedPermissions == 0) return message.channel.send(reply);
		return message.channel.send(embeds.errorEmbed(reply));
	}

	if (command.botPermissions) {
		for (let i = 0, len = command.botPermissions.length; command.botPermissions; i < len, i++) {
			if (command.botPermissions[i] == undefined) {
				break;
			}
			if ((message.channel.type == "text" && !message.guild.me.hasPermission(command.botPermissions[i]))) {
				let reply = format(vukkytils.getString("BOT_PERMISSION_NEEDED"), command.botPermissions[i]);
				if (embedPermissions == 0) return message.channel.send(reply);
				return message.channel.send(embeds.errorEmbed(reply));
			}
		}
	}

	if (command.userPermissions) {
		for (let i = 0, len = command.userPermissions.length; command.userPermissions; i < len, i++) {
			if (command.userPermissions[i] == undefined) {
				break;
			}
			if ((message.channel.type == "text" && !message.member.hasPermission(command.userPermissions[i]))) {
				let reply = format(vukkytils.getString("USER_PERMISSION_NEEDED"), command.userPermissions[i]);
				if (embedPermissions == 0) return message.channel.send(reply);
				return message.channel.send(embeds.errorEmbed(reply));
			}
		}
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id) && !config.misc.owner.includes(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			console.log(timeLeft.toFixed(0));
			let errorMsg = `You need to wait ${timeLeft.toFixed(1)} more second(s) before you can use the \`${command.name}\` command again.`;
			if (embedPermissions == 0) return message.channel.send(errorMsg);
			return message.channel.send(embeds.cooldownEmbed(errorMsg));
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	// Execute the command
	try {
		command.execute(message, args);
	} catch (error) {
		console.log(`[${command.name}] ${error.message}`);
		console.error(error);
		message.reply("there was an error trying to execute that command!", embeds.errorEmbed(error.message));
	}
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
	if (newMessage && newMessage.partial) {
		await newMessage.fetch()
			.catch(error => {
				console.log("Something went wrong when fetching the message: ", error);
			});
	}
	if (newMessage && newMessage.content && inviteSites.some(site => newMessage.content.includes(site)) && config.moderation.automod.allowInviteLinks == false && !newMessage.member.roles.cache.some(r => config.moderation.automod.allowInviteLinksBypassRoles.includes(r))) {
		newMessage.delete();
		newMessage.channel.send(format(vukkytils.getString("DISCORD_INVITES_DISABLED_AUTOMOD"), newMessage.author)).then(msg => setTimeout(() => msg.delete(), 7000));
	}
});

client.on("messageDelete", message => {	
	if (message.channel.name == config.counting.channelName) {
		counting.deletion(message);
	}
});

client.on("messageReactionAdd", async function(reaction, user){
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error("Something went wrong when fetching the message: ", error);
			return;
		}
	}
	if(reaction.emoji.name == "❗" && config.reports.enabled) {
		reaction.remove();
		let channel = reaction.message.guild.channels.cache.find(channel => channel.name === config.reports.channelName);
		channel.send(`<@&${reaction.message.guild.roles.cache.find(r => r.name === "Staff").id}>`, embeds.reportEmbed(reaction.message.url, reaction.message.author, user, reaction.message.content))
			.then(reportMessage => {
				reportMessage.react("🗑");
				const filter = (reaction, user) => {
					return reaction.emoji.name == "🗑" && user.bot == false;
				};

				reportMessage.awaitReactions(filter, { max: 1 })
					.then(collected => {
						const actionReaction = collected.first();
						reportMessage.reactions.removeAll();
						if(actionReaction.emoji.name == "🗑") {
							reaction.message.delete();
							reportMessage.edit(embeds.reportActionEmbed("The reported message was deleted.", reaction.message.content, actionReaction.users.cache.last()));
						}
					})
					.catch(() => {
						return reportMessage.channel.send("There was an error.");
					});
			});
	}
});

async function login() {
	const loginSpinner = ora().start();
	loginSpinner.prefixText = `[${vukkytils.getString("STARTUP")}]`;
	loginSpinner.spinner = "point";
	loginSpinner.text = `${vukkytils.getString("STARTUP_LOGGING_IN")}\n`;
	try {
		await client.login(process.env.BOT_TOKEN);
		loginSpinner.succeed(format(vukkytils.getString("STARTUP_LOGGED_IN"), client.user.tag));
	} catch (e) {
		if(e && e.message && e.message.endsWith("ENOTFOUND discord.com")) { 
			loginSpinner.fail(vukkytils.getString("STARTUP_LOGIN_FAILED_INTERNET_UNAVAILABLE"));
		} else {
			loginSpinner.fail(vukkytils.getString("STARTUP_LOGIN_FAILED"));
		}
		throw e;
	}
}

process.on("uncaughtException", function (err) {
	console.error(err);
});