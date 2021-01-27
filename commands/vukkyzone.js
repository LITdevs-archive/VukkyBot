// Copyright (C) 2020-2021 Vukky

const embeds = require("../utilities/embeds");

module.exports = {
	name: "vukkyzone",
	description: "Start a Vukky Zone.",
	botPermissions: ["EMBED_LINKS", "ADD_REACTIONS", "MANAGE_MESSAGES"],
	aliases: ["zone"],
	guildOnly: true,
	execute(message, args) {
		var randomEvent;
		message.delete();
		message.channel.send(`**Welcome to the Vukky Zone!** (started by <@${message.author.id}>)\nReact with ✨ to join the Vukky Zone, or 💥 to close it so no one can enter it anymore.`).then(vukkyzone => {
			vukkyzone.react("✨").then(() => vukkyzone.react("💥"));
			const filter = (reaction, user) => {
				return ["💥"].includes(reaction.emoji.name) && user.bot == false;
			};
            
			vukkyzone.awaitReactions(filter, { max: 1 })
				.then(collected => {
					const reaction = collected.first();
					var userCount = vukkyzone.reactions.cache.get("✨").count - 1;
					reaction.remove();
					randomEvent = Math.round(Math.random()) * 3;
					console.log(`Random event ID: ${randomEvent}`);
					vukkyzone.edit("🤔 Something very bad is happening to the Vukky Zone...\nReact with ✨ to join.");
					setTimeout(() => { 
						vukkyzone.edit("😮 The Vukky Zone suddenly started shaking...\nReact with ✨ to join.");
					}, 8000);
					setTimeout(() => { 
						userCount = vukkyzone.reactions.cache.get("✨").count - 1;
						vukkyzone.edit("😬 The entrance to the Vukky Zone was suddenly closed!");
						vukkyzone.reactions.removeAll();
					}, 12000);
					setTimeout(() => {  
						if(userCount == 0) {
							vukkyzone.edit("😶 Not much happened, because no one decided to join."); 
						} else if(randomEvent == 0) {
							vukkyzone.edit(`💥 **Boom!**\nThe Vukky Zone was blown up!\n${userCount} people died inside it, because they decided to join.`); 
						} else if (randomEvent == 1) {
							vukkyzone.edit(`🦠 **cough cough**\nThe Vukky Zone was closed due to COVID-19!\n${userCount} people got a severe case and died...`); 
						} else if (randomEvent == 2) {
							vukkyzone.edit(`🔨 **C R A S H**\nAn anvil suddenly fell down and killed ${userCount} people inside the Vukky Zone.`);
						} else {
							vukkyzone.edit(`🦆 **HONK**\nA wild goose appeared!\n${userCount} people were scared to death.`);
						}
						vukkyzone.reactions.removeAll();
					}, 18000);
				});
		});
	},
};
