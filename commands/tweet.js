const embeds = require("../utilities/embeds");
const config = require("../config.json");
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
	execute(message, args) {
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
					message.react("❌");
					message.reply(vukkytils.getString("TWEET_DENIED"));
				}
			});
	},
};
