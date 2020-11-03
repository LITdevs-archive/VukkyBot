const embeds = require("../embeds.js");
const fetch = require("node-fetch");
const commaNumber = require("comma-number");

module.exports = {
	name: "covid19",
	description: "Get COVID stats!",
	dcPermissions: ["EMBED_LINKS"],
	aliases: ["covid", "covid-19"],
	execute(message, args) {
		message.channel.send("<a:offlinegif:757979855924101220> Hold on! I'm getting the data...")
			.then(newMessage => {
				var diseaselink = args[0] ? `https://disease.sh/v3/covid-19/countries/${args[0].toLowerCase()}` : "https://disease.sh/v3/covid-19/all";
				console.log(diseaselink);
				fetch(diseaselink)
					.then(res => {
						if(!res.ok) {
							return newMessage.edit(`<:error:759701620777943062> ${res.status}`);
						}
						return res.json();
					})
					.then(json => {
						newMessage.edit("Thank you to <https://disease.sh>!", embeds.covidEmbed(args[0] ? json.countryInfo.flag : null, args[0] ? json.country : "Global", commaNumber(json.cases), commaNumber(json.todayCases), commaNumber(json.deaths), commaNumber(json.todayDeaths), commaNumber(json.recovered), commaNumber(json.todayRecovered), commaNumber(json.active), commaNumber(json.critical), commaNumber(json.tests)));
					});
			});
	},
};
