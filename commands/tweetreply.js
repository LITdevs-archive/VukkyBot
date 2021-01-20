const embeds = require("../utilities/embeds");
const config = require("../config.json");
require("dotenv").config();
var Twitter = require("twitter");
const { Util } = require("discord.js");
const vukkytils = require("../utilities/vukkytils");
const format = require("util").format;

module.exports = {
	name: "tweetreply",
	description: "Make VukkyBot reply to things on Twitter!",
	botPermissions: ["EMBED_LINKS", "MANAGE_MESSAGES"],
	cooldown: 120,
	aliases: ["replytweet"],
	usage: "<tweet ID> <content>",
	execute(message, args) {
		if(args.slice(1).join(" ").length > 280) return message.channel.send(embeds.errorEmbed("Sorry, but that tweet's too long."));
		if(isNaN(args[0])) return message.channel.send(embeds.errorEmbed("Your Tweet ID isn't a number!"));
		message.react("⬆").then(() => message.react("⬇"));
		const filter = (reaction, user) => {
			return ["⬆", "⬇"].includes(reaction.emoji.name) && user.id != message.author.id && user.bot == false;
		};
		message.reply(format(vukkytils.getString("TWEET_REPLYING_TO"), Util.removeMentions(`https://twitter.com/i/status/${args[0]}`))).then(tweetreplyDisclaimer => {
			message.awaitReactions(filter, { max: 1 })
				.then(collected => {
					message.reactions.removeAll();
					tweetreplyDisclaimer.delete();
					const reaction = collected.first();
					if(reaction.emoji.name == "⬆") {
						var client = new Twitter({
							consumer_key: process.env.TWITTER_KEY,
							consumer_secret: process.env.TWITTER_SECRET,
							access_token_key: process.env.TWITTER_ACCESS,
							access_token_secret: process.env.TWITTER_ACCESS_SECRET
						});
						message.channel.send(`${config.misc.emoji.loading} ${vukkytils.getString("TWEETING")}`).then(tweeting => {
							client.post("statuses/update", {status: args.slice(1).join(" "), in_reply_to_status_id: args[0], auto_populate_reply_metadata: true})
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
		});
	},
};
