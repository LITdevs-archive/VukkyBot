require("dotenv").config();
const fs = require("fs");
const counting = require("./counting.js");
const Discord = require("discord.js");
const ora = require("ora");
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION", "USER"]});
const chalk = require("chalk");
const success = chalk.green;
const warn = chalk.yellow;
const error = chalk.bold.red;
const info = chalk.blue;
const fetch = require("node-fetch");
const pjson = require("./package.json");
const embeds = require("./utilities/embeds");
const config = require("./config.json");
const vukkytils = require("./utilities/vukkytils");
const format = require("util").format;
const prefix = process.env.BOT_PREFIX;
client.commands = new Discord.Collection();
let updateRemindedOn = null;

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
let embedPermissions = 1;

console.clear();
console.log(`[${vukkytils.getString("STARTUP")}] ${vukkytils.getString("STARTING")}`);

const commandSpinner = ora(`${vukkytils.getString("STARTUP_LOADING_COMMANDS")}\n`).start();
commandSpinner.prefixText = `[${vukkytils.getString("STARTUP")}]`;
commandSpinner.spinner = "point";	
commandSpinner.render();
let commandsToLoad = commandFiles.length;
for (const file of commandFiles) {
	commandsToLoad--;
	commandSpinner.text = `${format(vukkytils.getString("STARTUP_LOADING_SPECIFIC_COMMAND"), file, commandFiles.indexOf(file), commandFiles.length)}\n`;
	commandSpinner.render();
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
	if(commandsToLoad == 0) {
		commandSpinner.succeed(vukkytils.getString("STARTUP_COMMANDS_LOADED"));
		login();
	}
}

const cooldowns = new Discord.Collection();

client.once("ready", () => {
	console.log(`\n[${vukkytils.getString("STARTUP")}] ${format(vukkytils.getString("READY"), pjson.version)}`);
	if(!process.env.BOT_PREFIX && process.env.PREFIX) console.log(`[${vukkytils.getString("STARTUP")}] ${vukkytils.getString("ENV_PREFIX_RENAMED")}`);
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
		"Cyberdelay 2077",
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
		"Among Them",
		"Vukkyland",
		"Super Vukky 64",
		"Paper Vukky: The Origami King",
		"Swift Playgrounds",
		"Elemental on Discord",
		"Genshin Impact",
		"VALORANT",
		"Terraria"
	];
	client.user.setActivity(`with the world (${pjson.version})`);
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
	const updateChecker = ora("Checking for updates...").start();
	updateChecker.prefixText = "[updater]";
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
			} else {
				updateChecker.info("No new updates available.");
			}
		});
}

const inviteSites = ["discord.gg/", "discord.com/invite/", "discordapp.com/invite/", "discord.co/invite", "watchanimeattheoffice.com/invite/", "discord.media/invite/"];
client.on("message", message => {
	if (message.author.bot) return;
	if ((message.channel.type == "text" && !message.guild.me.hasPermission("EMBED_LINKS"))) embedPermissions = 0;
	if (message.content.toLowerCase().includes(`<@!${client.user.id}>`) && config.misc.prefixReminder == true && !message.content.startsWith(prefix)) message.reply(`my prefix is \`${process.env.BOT_PREFIX}\``);
	if (message.channel.name == config.counting.channelName) counting.check(message, client);

	if (inviteSites.some(site => message.content.includes(site)) && config.moderation.automod.allowInviteLinks == false) {
		message.delete();
		message.channel.send(format(vukkytils.getString("DISCORD_INVITES_DISABLED_AUTOMOD"), message.author)).then(msg => setTimeout(() => msg.delete(), 7000));
	}

	if (!message.content.toLowerCase().startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (commandName == "") return;

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) {
		if(config.misc.invalidCmdReminder) {
			let reply = `I've been looking around for a while now, but I don't think **${commandName}** is a command.`;
			if (embedPermissions == 0) return message.channel.send(reply);
			message.channel.send(embeds.errorEmbed(reply));
		}
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

client.on("messageUpdate", async (oldMessage, newMessage) => {
	if (newMessage.partial) {
		await newMessage.fetch()
			.catch(error => {
				console.log("Something went wrong when fetching the message: ", error);
			});
	}
	if (inviteSites.some(site => newMessage.content.includes(site)) && config.moderation.automod.allowInviteLinks == false) {
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
					.catch(collected => {
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
