// Copyright (C) 2020-2021 Vukky

const embeds = require("../utilities/embeds");
const config = require("../config.json");
const fetch = require("node-fetch");
const commaNumber = require("comma-number");
const { Util } = require("discord.js");
const vukkytils = require("../utilities/vukkytils");
const format = require("util").format;

module.exports = {
	name: "covid19",
	description: "Get COVID stats!",
	botPermissions: ["EMBED_LINKS"],
	aliases: ["covid", "covid-19"],
	execute(message, args) {
		message.channel.send(`${config.misc.emoji.loading} ${vukkytils.getString("GETTING_DATA")}`)
			.then(newMessage => {
				var country = args[0] ? Util.removeMentions(args.slice(0).join(" ").toLowerCase()) : null;
				var diseaselink = args[0] ? `https://disease.sh/v3/covid-19/countries/${country}` : "https://disease.sh/v3/covid-19/all";
				fetch(diseaselink)
					.then(res => {
						if(!res.ok) {
							return newMessage.edit(`${config.misc.emoji.error} ${res.status} - Either ${country} isn't a country, there are no cases there, or something bad happened.`);
						}
						return res.json();
					})
					.then(json => {
						newMessage.edit(format(vukkytils.getString("API_CREDIT"), "https://disease.sh"), embeds.covidEmbed(country ? json.countryInfo.flag : null, country ? json.country : "Global", commaNumber(json.cases), commaNumber(json.todayCases), commaNumber(json.deaths), commaNumber(json.todayDeaths), commaNumber(json.recovered), commaNumber(json.todayRecovered), commaNumber(json.active), commaNumber(json.critical), commaNumber(json.tests)));
					});
			});
	},
};
