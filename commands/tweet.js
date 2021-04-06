// Copyright (C) 2021 Vukky, vtheskeleton

const embeds = require("../utilities/embeds");
require("dotenv").config();
var Twitter = require("twitter");
const vukkytils = require("../utilities/vukkytils");
const format = require("util").format;

module.exports = {
	name: "tweet",
	description: "Make VukkyBot say things on Twitter!",
	botPermissions: ["EMBED_LINKS", "MANAGE_MESSAGES"],
	cooldown: 120,
	usage: "<content>",
	guildOnly: true,
	execute(message, args) {
		delete require.cache[require.resolve("../config.json")];
		const config = require("../config.json");
		if(config.commands.tweet.blacklist[message.author.id]) return message.channel.send(embeds.tweetBlacklistEmbed(config.commands.tweet.blacklist[message.author.id]));
		if(args.slice(0).join(" ").length > 280) return message.channel.send(embeds.errorEmbed("Sorry, but that tweet's too long."));
		message.react("⬆").then(() => message.react("⬇"));
		const filter = (reaction, user) => {
			return ["⬆", "⬇"].includes(reaction.emoji.name) && user.id != message.author.id && user.bot == false;
		};
		message.awaitReactions(filter, { max: 1 })
			.then(collected => {
				message.reactions.removeAll();
				const reaction = collected.first();
				if(reaction.emoji.name == "⬆") {
					if(reaction.users.cache) console.log(`[twttr] tweet approved by ${reaction.users.cache.last().tag}: ${args.slice(0).join(" ")}`);
					var client = new Twitter({
						consumer_key: process.env.TWITTER_KEY,
						consumer_secret: process.env.TWITTER_SECRET,
						access_token_key: process.env.TWITTER_ACCESS,
						access_token_secret: process.env.TWITTER_ACCESS_SECRET
					});
					message.channel.send(`${config.misc.emoji.loading} ${vukkytils.getString("TWEETING")}`).then(tweeting => {
						client.post("statuses/update", {status: args.slice(0).join(" ")})
							.then(function (tweet) {
								tweeting.delete();
								message.react("✅");
								message.reply(format(vukkytils.getString("TWEET_APPROVED"), `https://twitter.com/i/status/${tweet.id_str}`));
							})
							.catch(function (error) {
								tweeting.delete();
								message.react("❌");
								message.reply("there was an error!", embeds.errorEmbed(`${error.message ? error.message : "Unknown error."}`));
								throw error;
							});
					});
				} else if (reaction.emoji.name == "⬇") {
					if(reaction.users.cache) console.log(`[twttr] tweet denied by ${reaction.users.cache.last().tag}: ${args.slice(0).join(" ")}`);
					message.react("❌");
					message.reply(vukkytils.getString("TWEET_DENIED"));
				}
			});
	},
};
