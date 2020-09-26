require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

const embeds = require("./embeds.js");
const config = require("./config.json");
const prefix = process.env.PREFIX;
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
let embedPermissions = 1;

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
	console.log(`${file} loaded!`)
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	console.log('Ready!');
	const pjson = require('./package.json')
	client.user.setActivity(`with a Fall Guy (and v${pjson.version})`, { type: 'PLAYING' });
});

client.on('message', message => {

  if ((message.channel.type == "text" && !message.guild.me.hasPermission("EMBED_LINKS"))) embedPermissions = 0

  if (message.author.bot) return;

  if (message.content.toLowerCase().includes(`<@!${client.user.id}>`) && config.misc.prefixReminder == true && !message.content.startsWith(prefix)) message.reply(`my prefix is \`${process.env.PREFIX}\``)

  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) {
			reply = `I've been looking around for a while now, but I don't think **${commandName}** is a command.`
			if (embedPermissions == 0) return message.channel.send(reply)
      message.channel.send(embeds.errorEmbed(reply))
      return;
  }

  if (command.guildOnly && message.channel.type !== 'text') {
	   return message.channel.send(embeds.errorEmbed(`**${commandName}** cannot be used inside DMs.`))
  }

  if (command.args && !args.length) {
    let reply = `I expected you to give me some arguments for **${commandName}**, but I didn't see any.`;

    if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
 		}
		if (embedPermissions == 0) return message.channel.send(reply)
 		return message.channel.send(embeds.errorEmbed(reply))
 	}

	if (command.dcPermissions) {
		console.log("-------------PERMISSION CHECKS---------------")
		var breaker = 0;
		for (i = 0, len = command.dcPermissions.length; command.dcPermissions; i < len, i++) {
			if (command.dcPermissions[i] == undefined) {
				console.log(`That should be it for ${prefix}${commandName} - yay! Breaking the loop now...`)
				break;
			}
			if (breaker == 1) break;
			console.log(`${prefix}${commandName} wants ${command.dcPermissions[i]} - checking for permission...`)
		  if ((message.channel.type == "text" && !message.guild.me.hasPermission(command.dcPermissions[i]))) {
				console.log(`Crap, looks like someone forgot to give us ${command.dcPermissions[i]}. Breaking the loop now...`)
				breaker = 1
				console.log("---------------------------------------------")
				reply = `Sorry, but I need the \`${command.dcPermissions[i]}\` permission to use that command.`
				if (embedPermissions == 0) return message.channel.send(reply)
				message.channel.send(embeds.errorEmbed(reply))
				return;
			}
			console.log(`Looks like we have ${command.dcPermissions[i]}! Okay, moving on...`)
		}
		console.log("---------------------------------------------")
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
		console.log(`error while trying to execute command: ${error.message}`)
		message.reply('there was an error trying to execute that command!', embeds.errorEmbed(error.message));
	}
});

client.login(process.env.BOT_TOKEN);
