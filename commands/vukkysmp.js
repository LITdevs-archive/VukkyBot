const bot = "802596804977229864";

module.exports = {
	name: "vukkysmp",
	description: "VukkySMP management",
	botPermissions: ["EMBED_LINKS"],
	execute(message, args) {
		async function countdown(message, command, options) {
			let messages = ["5...", "4...", "3...", "2...", "1...", "0!"];
			if(options.notif) {
				await message.channel.send(`say ${message.author.tag} started a ${options.reverse ? "countup" : "countdown"}.`);
			}
			if(options.reverse) {
				messages = ["Let's get counting!", "1...", "2...", "3...", "4...", "5!"];
			}
			await message.channel.send(`title @a actionbar "${messages[0]}"`);
			setTimeout(async () => {
				await message.channel.send(`title @a actionbar "${messages[1]}"`);
				setTimeout(async () => {
					await message.channel.send(`title @a actionbar "${messages[2]}"`);
					setTimeout(async () => {
						await message.channel.send(`title @a actionbar "${messages[3]}"`);
						setTimeout(async () => {
							await message.channel.send(`title @a actionbar "${messages[4]}"`);
							setTimeout(async () => {
								await message.channel.send(`title @a actionbar "${messages[5]}"`);
								message.channel.send(command);
							}, 1000);
						}, 1000);
					}, 1000);
				}, 1000);
			}, 1000);
		}
		if(message.channel.id == "805522341437243432") {
			if(args[0] == "save") {
				console.log(`[mcserv] ${message.author.id} (${message.author.tag}) saved the data.`);
				message.channel.send(`say ${message.author.tag} saved the data.`)
					.then(message.channel.send("save-all"))
					.then(message.channel.send("title @a actionbar \"Saving your data...\""));
				const filter = response => {
					return response.content.includes("INFO] Saved the game") && response.author.id == bot;
				};
				message.channel.awaitMessages(filter, { max: 1 })
					.then(collected => {
						message.channel.send("title @a actionbar \"Data saved!\"");
					});
			} else if (args[0] == "stop") {
				console.log(`[mcserv] ${message.author.id} (${message.author.tag}) stopped the server.`);
				message.channel.send(`say ${message.author.tag} is shutting down the server.`)
					.then(message.channel.send("title @a title \"Shutting down\""))
					.then(message.channel.send("save-all"))
					.then(message.channel.send("title @a actionbar \"Saving your data...\""));
				const filter = response => {
					return response.content.includes("INFO] Saved the game") && response.author.id == bot;
				};
				message.channel.awaitMessages(filter, { max: 1 })
					.then(collected => {
						message.channel.send("title @a actionbar \"Data saved!\"")
							.then(countdown(message, "stop", { notif: false, reverse: false }));
					});
			} else if (args[0] == "reload") {
				console.log(`[mcserv] ${message.author.id} (${message.author.tag}) reloaded the plugins.`);
				message.channel.send(`say ${message.author.tag} is reloading the plugins.`)
					.then(message.channel.send("title @a title \"Lag incoming!\""))
					.then(message.channel.send("reload confirm"));
				const filter = response => {
					return response.author.id == bot;
				};
				message.channel.awaitMessages(filter, { max: 1 })
					.then(collected => {
						message.channel.send("title @a title \"Lag ended.\"");
					});
			} else if (args[0] == "restart") {
				console.log(`[mcserv] ${message.author.id} (${message.author.tag}) restarted the server.`);
				message.channel.send(`say ${message.author.tag} is restarting the server.`)
					.then(message.channel.send("title @a title \"Restarting\""))
					.then(message.channel.send("save-all"))
					.then(message.channel.send("title @a actionbar \"Saving your data...\""));
				const filter = response => {
					return response.content.includes("INFO] Saved the game") && response.author.id == bot;
				};
				message.channel.awaitMessages(filter, { max: 1 })
					.then(collected => {
						message.channel.send("title @a actionbar \"Data saved!\"")
							.then(countdown(message, "restart", { notif: false, reverse: false }));
					});
			} else if (args[0] == "countdown") {
				countdown(message, args.slice(1).join(" "), { notif: true, reverse: false });
			} else if (args[0] == "countup") {
				countdown(message, args.slice(1).join(" "), { notif: true, reverse: true });
			}
		} else {
			message.channel.send(`${message.channel.name} is not in the sudoers file. This incident will be reported.\nIn other words, you're not meant to use this command.`);
			console.log(`[mcserv] ${message.author.id} (${message.author.tag}) attempted running mcserv in ${message.channel.id} (${message.channel.name})!`);
		}
	},
};