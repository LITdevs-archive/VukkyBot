const embeds = require("../utilities/embeds");
const config = require("../config.json");
var specialCode;
var specialCodeContents;

function confirmDroppy(message, args) {
	const prize = args.slice(1).join(" ");
	let stringy = `Do you want to make a giveaway drop with the prize ${prize}?`;
	if(specialCode == true) { stringy = `Do you want to make a giveaway drop with the prize ${prize}, containing a code (**${specialCodeContents}**)?`;}
	message.channel.send(embeds.inputEmbed(stringy))
		.then(checkmessage => {
			checkmessage.react("👍").then(() => checkmessage.react("👎"));

			const filter = (reaction, user) => {
				return user.id === message.author.id;
			};

			checkmessage.awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
				.then(collected => {
					const reaction = collected.first();

					if (reaction.emoji.name === "👍") {
						droppy(message, prize);
					} else {
						message.channel.send(embeds.successEmbed("Giveaway drop creation has been cancelled!"));
					}
				})
				.catch(collected => {
					console.log(`👨‍💻 Drop creation failed: ${collected.message}`);
					return message.channel.send("you didn't answer in time, or there was an error.");
				});
		});
}
function droppy(message, prize) {
	message.mentions.channels.first().send("Good luck to everyone that attempts!", embeds.GiveawayDrop(prize, message.author, specialCode))
		.then(gmessage => {
			gmessage.react("🎉");
			const filter = (reaction, user) => reaction.emoji.name === "🎉" && user.bot === false;
			console.log(`[drops] The ${prize} giveaway drop begins NOW!`);
			try {
				console.log("[drops] Waiting for reactions...");
				gmessage.channel.startTyping();
				message.channel.send(embeds.successEmbed(`alright, a giveaway drop for ${prize} has been started now in <#${gmessage.channel.id}>!`));
				gmessage.awaitReactions(filter, { max: 1, time: 600000, errors: ["time"] })
					.then(collected => {
						const reaction = collected.first();
						const winner = collected.first().users.cache.last();
						if (reaction.emoji.name === "🎉") {
							gmessage.channel.stopTyping();
							console.log(`[drops] A winner for ${prize} has been found!`);
							gmessage.reactions.removeAll();
							gmessage.edit(embeds.GiveawayWinner(prize, message.author, `<@!${winner.id}>`));
							message.channel.send(embeds.infoEmbed(`<@!${winner.id}> got a drop (**${prize}**)`));
							gmessage.channel.send(`Congratulations to <@!${winner.id}> for getting a giveaway drop! 🥳\nThe prize was ${prize} - better luck next time to everyone else!`);
							let winnerBase = `🎉 __**You got a giveaway drop!**__ 🎉\nYour prize is \`${prize}\`.\n`;
							let winnerMsg;
							if(!specialCode) { winnerMsg = `${winnerBase}Contact <@!${message.member.id}> to collect your prize!`; }
							if(specialCode) { winnerMsg = `${winnerBase}This drop comes with a special code. That code is **${specialCodeContents}**!\nYou may not have to contact <@!${message.member.id}>.`; }
							winner.send(winnerMsg);
						}
					}).catch(collected => {
						gmessage.channel.stopTyping();
						console.log(`Nobody cared about ${prize}, that's kinda disappointing. :ragi:`);
						gmessage.reactions.removeAll();
						gmessage.edit(embeds.GiveawayInvalid(prize, message.author));
						gmessage.channel.send(`No one got the ${prize} giveaway drop, so it has automatically expired.\n${prize} can no longer be claimed.`);
					});
			} catch (e) {
				gmessage.channel.stopTyping();
				console.log(e);
			}
		});
}

module.exports = {
	name: "giveaway-drop",
	description: "Do some giveaway drops. Now that's cool.",
	botPermissions: ["EMBED_LINKS", "ADD_REACTIONS", "MANAGE_MESSAGES"],
	args: true,
	usage: "<#channel> <prize>",
	guildOnly: true,
	aliases: ["drop", "giveawaydrop"],
	execute(message, args) {
		specialCodeContents = null;
		message.channel.send("Welcome to the giveaway drop creator!\n⚠ **Please note**: The prize name is logged for debugging purposes.");
		if (message.member.permissions.has("ADMINISTRATOR") || message.member.roles.cache.find(r => r.name === "Drop Permissions")) {
			if (message.mentions.channels.size !== 0) {
				if (args.slice(1).join(" ")) {
					if(config.commands.giveawaydrop.codes == true) {
						message.channel.send(embeds.inputEmbed("Does ths drop have a special code?"))
							.then(checkmessage => {
								checkmessage.react("👍").then(() => checkmessage.react("👎"));

								const filter = (reaction, user) => {
									return user.id === message.author.id;
								};

								checkmessage.awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
									.then(collected => {
										const reaction = collected.first();

										if (reaction.emoji.name === "👍") {
											specialCode = true;
											message.channel.send(embeds.inputEmbed("What's the code?"));

											const filter2 = responsy => {
												return responsy.author.id === message.author.id;
											};

											message.channel.awaitMessages(filter2, { max: 1, time: 30000, errors: ["time"] })
												.then(collected => {
													specialCodeContents = collected.first().content;
													confirmDroppy(message, args);
												})
												.catch(collected => {
													console.log(`👨‍💻 Drop creation failed: ${collected.message}`);
													return message.channel.send("you didn't answer in time, or there was an error.");
												});
										} else {
											specialCode = false;
											confirmDroppy(message, args);
										}
									})
									.catch(collected => {
										console.log(`👨‍💻 Drop creation failed: ${collected.message}`);
										return message.channel.send("you didn't answer in time, or there was an error.");
									});
							});
					} else {
						specialCode = false;
						confirmDroppy(message, args);
					}
				} else {
					message.channel.send(embeds.errorEmbed("A prize is required! (<#channel> <prize>)"));
				}
			} else {
				message.channel.send(embeds.errorEmbed("A channel is required! (<#channel> <prize>)"));
			}
		} else {
			message.channel.send(embeds.errorEmbed("Starting giveaway drops requires the `ADMINISTRATOR` permission or the **Drop Permissions** role."));
		}
	}
};
