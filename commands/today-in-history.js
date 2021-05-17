const embeds = require("../utilities/embeds");
const config = require("../config.json");
const fetch = require("node-fetch");
const vukkytils = require("../utilities/vukkytils");
const format = require("util").format;

module.exports = {
	name: "today-in-history",
	description: "Find out what happened today in history!",
	botPermissions: ["EMBED_LINKS"],
	cooldown: 60,
	aliases: ["today", "history"],
	execute(message, args) {
		message.channel.send(`${config.misc.emoji.loading} ${vukkytils.getString("GETTING_DATA")}`)
			.then(newMessage => {
				fetch("https://history.muffinlabs.com/date")
					.then(res => res.json())
					.then(json => {
						var result = json["data"]["Events"][Math.floor(Math.random() * json["data"]["Events"].length)];
						newMessage.edit(format(vukkytils.getString("API_CREDIT"), "https://history.muffinlabs.com"), embeds.todayInHistoryEmbed(result.text, result.year, json.date, result.links));
					});
			});
	},
};
