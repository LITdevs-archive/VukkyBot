/* eslint-disable no-inner-declarations */
// Copyright (C) 2021 Vukky, vtheskeleton

const embeds = require("../utilities/embeds");
const fetch = require("node-fetch");
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
	aliases: ["twt", "tw"],
	execute(message, args) {
		let attachments = [];
		if(message.attachments.first()) attachments = message.attachments.map(attachment => attachment.url);
		const tweet = args.slice(0).join(" ");
		delete require.cache[require.resolve("../config.json")];
		const config = require("../config.json");
		let selfdownvote = false;
		if(config.commands.tweet.blacklist[message.author.id]) return message.channel.send(embeds.tweetBlacklistEmbed(config.commands.tweet.blacklist[message.author.id]));
		if(tweet.length == 0 && attachments.length == 0) return message.channel.send(embeds.errorEmbed("That tweet is pretty empty!"));
		if(tweet.length > 280) return message.channel.send(embeds.errorEmbed("Sorry, but that tweet's too long."));
		if(attachments.length > 1) return message.channel.send(embeds.errorEmbed("Only 1 attachment at a time is currently supported."));
		message.react("⬆").then(() => message.react("⬇"));
		const filter = (reaction, user) => {
			if(user.bot) return false;
			if(reaction.emoji.name == "⬆" && config.misc.owner.includes(user.id)) return true;
			if(reaction.emoji.name == "⬆" && user.id == message.author.id) return false;
			if(reaction.emoji.name == "⬆" && user.id != message.author.id) return true;
			if(reaction.emoji.name == "⬇") {
				if(user.id == message.author.id) selfdownvote = true;
				return true;
			}
			return false;
		};
		message.awaitReactions(filter, { max: 1 })
			.then(async collected => {
				const reaction = collected.first();
				if(!reaction || !reaction.emoji || !reaction.emoji.name) return message.channel.send("could not get result");
				if(reaction.emoji.name == "⬆") {
					await message.reactions.removeAll();
					if(reaction.users.cache) console.log(`[twttr] tweet approved by ${reaction.users.cache.last().tag}: ${tweet}`);
					var client = new Twitter({
						consumer_key: process.env.TWITTER_KEY,
						consumer_secret: process.env.TWITTER_SECRET,
						access_token_key: process.env.TWITTER_ACCESS,
						access_token_secret: process.env.TWITTER_ACCESS_SECRET
					});
					await message.react(config.misc.emoji.loading);
					let status = {
						status: tweet
					};
					if(attachments.length == 1) {
						await fetch(attachments[0])
							.then(res => res.buffer())
							.then(buffer => {
								client.post("media/upload", {media: buffer}, async function(error, media) {
									if (!error) {
										status.media_ids = media.media_id_string;
										post();
									} else {
										console.error(error);
										await message.reactions.removeAll();
										await message.react("❌");
										message.reply("there was an error!", embeds.errorEmbed(`${error.message ? error.message : "Unknown error."}`));
									}
								});
							});
					} else {
						post();
					}
					function post() {
						client.post("statuses/update", status)
							.then(async function (tweet) {
								await message.reactions.removeAll();
								await message.react("✅");
								message.reply(format(vukkytils.getString("TWEET_APPROVED"), `https://twitter.com/i/status/${tweet.id_str}`));
							})
							.catch(async function (error) {
								await message.reactions.removeAll();
								await message.react("❌");
								message.reply("there was an error!", embeds.errorEmbed(`${error.message ? error.message : "Unknown error."}`));
								throw error;
							});
					}
				} else if (reaction.emoji.name == "⬇") {
					if(!selfdownvote) {
						await message.reactions.removeAll();
						if(reaction.users.cache) console.log(`[twttr] tweet denied by ${reaction.users.cache.last().tag}: ${tweet}`);
						await message.react("❌");
						message.reply(vukkytils.getString("TWEET_DENIED"));
					} else {
						message.delete();
					}
				}
			});
	},
};
