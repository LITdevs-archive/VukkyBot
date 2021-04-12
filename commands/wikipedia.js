// Copyright (C) 2020 Vukky

const embeds = require("../utilities/embeds");
const fetch = require("node-fetch");
const config = require("../config.json");
const vukkytils = require("../utilities/vukkytils");
const format = require("util").format;

module.exports = {
	name: "wikipedia",
	description: "Search Wikipedia using VukkyBot!",
	botPermissions: ["EMBED_LINKS"],
	aliases: ["wiki"],
	execute(message, args) {
		message.channel.send(`${config.misc.emoji.loading} ${vukkytils.getString("GETTING_DATA")}`)
			.then(newMessage => {
				var search = args.slice(0).join(" ");
				fetch(`https://${config.commands.wikipedia.site}/api/rest_v1/page/summary/${search}`)
					.then(res => res.json())
					.then(json => {
						if(json.type === "https://mediawiki.org/wiki/HyperSwitch/errors/not_found") {
							newMessage.edit(format(vukkytils.getString("WIKIPEDIA_DOESNT_EXIST"), search));
						} else if (json.type === "https://mediawiki.org/wiki/HyperSwitch/errors/bad_request" && json.detail === "title-invalid-characters") {
							newMessage.edit(format(vukkytils.getString("WIKIPEDIA_INVALID_CHARS"), search));
						} else {
							newMessage.edit(vukkytils.getString("DATA_GOTTEN"), embeds.wikipediaEmbed(json.titles.normalized, json.description || vukkytils.getString("WIKIPEDIA_NO_SHORT_DESC"), json.extract, json.originalimage ? json.originalimage.source : undefined, json.content_urls.desktop.page));
						}
					});
			});
	},
};
