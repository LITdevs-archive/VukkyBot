const Discord = require("discord.js");
const pjson = require("../package.json");
const config = require("../config.json");
const avatarURL = "https://i.imgur.com/H0sAkrl.png";
// please don't remove the copyright text, but of course it's up to you
let versionString = `v${pjson.version} (discord.js ${pjson.dependencies["discord.js"].substring(1)}) • VukkyBot © Vukky Ltd 2020-2021`;

const vukkytils = require("./vukkytils");
const format = require("util").format;

module.exports = {
	errorEmbed,
	warningEmbed,
	infoEmbed,
	successEmbed,
	GiveawayDrop,
	GiveawayWinner,
	GiveawayInvalid,
	inputEmbed,
	quizStartEmbed,
	quizWinnerEmbed,
	quizLoseEmbed,
	cooldownEmbed,
	cryptoEmbed,
	todayInHistoryEmbed,
	funFactEmbed,
	duckEmbed,
	aboutEmbed,
	covidEmbed,
	warnsUserEmbed,
	innerEmbed,
	reportEmbed,
	reportActionEmbed,
	versionString,
	avatarURL
};

function errorEmbed(errorMsg) {
	return new Discord.MessageEmbed()
		.setColor("#ff0000")
		.setTitle(`❌ ${vukkytils.getString("ERROR_GENERIC")}`)
		.setDescription(errorMsg)
		.setTimestamp()
		.setFooter(versionString, avatarURL);
}

function warningEmbed(warningMsg) {
	return new Discord.MessageEmbed()
		.setColor("#ffc83d")
		.setTitle(`⚠ ${vukkytils.getString("WARNING")}`)
		.setDescription(warningMsg)
		.setTimestamp()
		.setFooter(versionString, avatarURL);
}

function infoEmbed(informationMsg) {
	return new Discord.MessageEmbed()
		.setColor("#4b83c3")
		.setTitle(`ℹ ${vukkytils.getString("INFORMATION")}`)
		.setDescription(informationMsg)
		.setTimestamp()
		.setFooter(versionString, avatarURL);
}

function successEmbed(successMsg) {
	return new Discord.MessageEmbed()
		.setColor("#16c60c")
		.setTitle(`✅ ${vukkytils.getString("SUCCESS")}`)
		.setDescription(successMsg)
		.setTimestamp()
		.setFooter(versionString, avatarURL);
}

function inputEmbed(detailsMsg) {
	return new Discord.MessageEmbed()
		.setColor("#99aab5")
		.setTitle(`⌨ ${vukkytils.getString("INPUT_REQUESTED")}`)
		.setDescription(detailsMsg)
		.setTimestamp()
		.setFooter(versionString, avatarURL);
}

function GiveawayDrop(prize, dropped_by, code) {
	let howToString = vukkytils.getString("GIVEAWAY_DROP_HOWTO");
	let titleString = `🎁 ${vukkytils.getString("GIVEAWAY_DROP")}`;
	if(code == true) {
		howToString = howToString.concat(vukkytils.getString("GIVEAWAY_DROP_HOWTO_CODE"));
		titleString = `🎁⌨ ${vukkytils.getString("GIVEAWAY_DROP_CODE")}`;
	}
	return new Discord.MessageEmbed()
		.setColor("#D0A33E")
		.setTitle(titleString)
		.addField(vukkytils.getString("GIVEAWAY_PRIZE"), prize, false)
		.addField(vukkytils.getString("GIVEAWAY_DROP_WINNER"), vukkytils.getString("GIVEAWAY_DROP_NO_WINNER_YET"), false)
		.addField(vukkytils.getString("GIVEAWAY_DROP_HOWDOIWIN"), howToString, false)
		.setAuthor(format(vukkytils.getString("GIVEAWAY_DROP_STARTED_BY"), dropped_by.tag))
		.setTimestamp()
		.setFooter(versionString, avatarURL);
}

function GiveawayWinner(prize, dropped_by, winner) {
	return new Discord.MessageEmbed()
		.setColor("#D000BC")
		.setTitle(`👑 ${vukkytils.getString("GIVEAWAY_DROP_WINNER")}`)
		.addField(vukkytils.getString("GIVEAWAY_PRIZE"), prize, false)
		.addField(vukkytils.getString("WINNER"), winner, false)
		.setAuthor(format(vukkytils.getString("GIVEAWAY_DROP_STARTED_BY"), dropped_by.tag))
		.setTimestamp()
		.setFooter(versionString, avatarURL);
}

function GiveawayInvalid(prize, dropped_by) {
	return new Discord.MessageEmbed()
		.setColor("#8EA5D0")
		.setTitle(`💸 ${vukkytils.getString("GIVEAWAY_DROP_EXPIRED")}`)
		.addField(vukkytils.getString("GIVEAWAY_PRIZE"), prize, false)
		.setDescription(vukkytils.getString("GIVEAWAY_PRIZE_INVALID"))
		.setAuthor(format(vukkytils.getString("GIVEAWAY_DROP_STARTED_BY"), dropped_by.tag))
		.setTimestamp()
		.setFooter(versionString, avatarURL);
}

function quizStartEmbed(question, time, hint, author, categories) {
	var description = `**Categories:** ${categories.join(", ")}\n\n${question}\nYou have ${time} seconds to answer!\n`;
	author = (!author) ? vukkytils.getString("QUIZ_UNKNOWN_USER") : author;
	if(hint && config.commands.quiz.hints == true) {
		description = description.concat(`\n💡 **${vukkytils.getString("QUIZ_HINT_AVAILABLE")}** ||${hint}||`);
	}
	description = description.concat(`\n📝 This question was brought to you by ${author} :)`);
	return new Discord.MessageEmbed()
		.setColor("#7289da")
		.setTitle(`❓ ${vukkytils.getString("QUIZ_START")}`)
		.setDescription(description)
		.setTimestamp()
		.setFooter(versionString, avatarURL);
}

function quizWinnerEmbed(winner) {
	return new Discord.MessageEmbed()
		.setColor("#ffc83d")
		.setTitle(`👑 ${vukkytils.getString("QUIZ_WINNER_TITLE")}`)
		.setDescription(format(vukkytils.getString("QUIZ_WINNER_DESCRIPTION"), winner.author))
		.setTimestamp()
		.setFooter(versionString, avatarURL);
}

function quizLoseEmbed(message) {
	return new Discord.MessageEmbed()
		.setColor("#be1931")
		.setTitle(`😅 ${vukkytils.getString("QUIZ_GAME_OVER")}`)
		.setDescription(message)
		.setTimestamp()
		.setFooter(versionString, avatarURL);
}

function cooldownEmbed(message) {
	return new Discord.MessageEmbed()
		.setColor("#ffffff")
		.setTitle(`⏲ ${vukkytils.getString("SLOW_DOWN")}`)
		.setDescription(message)
		.setTimestamp()
		.setFooter(versionString, avatarURL);
}

function cryptoEmbed(coin, value, lastupdated, change24) {
	return new Discord.MessageEmbed()
		.setColor("#a7d28b")
		.setTitle(`💰 ${coin} value`)
		.setDescription(vukkytils.getString("DATA_GOTTEN"))
		.addField(vukkytils.getString("CRYPTO_VALUE"), `$${value}`, true)
		.addField(vukkytils.getString("CRYPTO_VALUE_CHANGE"), `$${change24}`, true)  
		.addField(vukkytils.getString("CRYPTO_LAST_UPDATED"), lastupdated, true)
		.setTimestamp()
		.setFooter(versionString, avatarURL);
}

function todayInHistoryEmbed(event, year, date, links) {
	var linkies = [];
	if (links) {
		for (var singlelink in links) {
			// eslint-disable-next-line no-prototype-builtins
			if (links.hasOwnProperty(singlelink)) {
				linkies.push(`[${links[singlelink].title}](${links[singlelink].link})`);
			}
		}
	} else {
		linkies.push("None");
	}
	return new Discord.MessageEmbed()
		.setColor("#aab8c2")
		.setTitle(vukkytils.getString("TIH"))
		.setDescription(event)
		.addField(vukkytils.getString("TIH_YEAR"), year, true)
		.addField(vukkytils.getString("TIH_DATE"), date, true)
		.addField(vukkytils.getString("TIH_LINKS"), linkies.join(", "), true)
		.setTimestamp()
		.setFooter(versionString, avatarURL);
}

function funFactEmbed(fact, category, image, source) {
	return new Discord.MessageEmbed()
		.setColor("#ffc83d")
		.setTitle(`🧠 ${vukkytils.getString("DID_YOU_KNOW")} ${category}`)
		.setDescription(fact)
		.setTimestamp()
		.setImage(image)
		.setAuthor(`Source: ${source}`)
		.setFooter(versionString, avatarURL);
}

function duckEmbed(image) {
	var message = image.toLowerCase().includes("gif") ? vukkytils.getString("DUCK_ANIMATED") : vukkytils.getString("DUCK_NORMAL");
	return new Discord.MessageEmbed()
		.setColor("#8e562e")
		.setTitle(message)
		.setImage(image)
		.setTimestamp()
		.setFooter(versionString, avatarURL);
}

function innerEmbed(image) {
	return new Discord.MessageEmbed()
		.setColor("#8e562e")
		.setTitle(vukkytils.getString("HELLO_INNER_VUKKY"))
		.setImage(image)
		.setTimestamp()
		.setFooter(versionString, avatarURL);
}

function aboutEmbed(botversion, discordjsversion, osinfo) {
	return new Discord.MessageEmbed()
		.setColor("#4289c1")
		.setTitle(`💁‍♂️ ${vukkytils.getString("ABOUT_VUKKYBOT_TITLE")}`)
		.setDescription("Did you know? [VukkyBot is open source!](https://github.com/VukkyLtd/VukkyBot)")
		.addField(vukkytils.getStringString("ABOUT_VUKKYBOT_BOT_VER"), botversion, true)
		.addField(vukkytils.getString("ABOUT_VUKKYBOT_DJS_VER"), discordjsversion, true)
		.addField(vukkytils.getString("ABOUT_VUKKYBOT_OS_INFO"), osinfo, true)
		.setTimestamp()
		.setFooter(versionString, avatarURL);
}

function covidEmbed(flag, location, cases, casesToday, deaths, deathsToday, recovered, recoveredToday, active, critical, tests) {
	return new Discord.MessageEmbed()
		.setColor("#8e562e")
		.setTitle(format(vukkytils.getString("COVID_LOCATION"), location))
		.addField(vukkytils.getString("COVID_CASES"), cases, true)
		.addField(vukkytils.getString("COVID_CASES_TODAY"), casesToday, true)
		.addField(vukkytils.getString("COVID_DEATHS"), deaths, true)
		.addField(vukkytils.getString("COVID_DEATHS_TODAY"), deathsToday, true)		
		.addField(vukkytils.getString("COVID_RECOVERED"), recovered, true)
		.addField(vukkytils.getString("COVID_RECOVERED_TODAY"), recoveredToday, true)
		.addField(vukkytils.getString("COVID_ACTIVE"), active, true)
		.addField(vukkytils.getString("COVID_CRITICAL"), critical, true)
		.addField(vukkytils.getString("COVID_TESTS"), tests, true)
		.setTimestamp()
		.setThumbnail(flag)
		.setFooter(versionString, avatarURL);
}

function warnsUserEmbed(username, warns) {
	return new Discord.MessageEmbed()
		.setColor("#ffcc4d")
		.setTitle(`⚠ ${format(vukkytils.getString("WARNINGS_TITLE"), username)}`)
		.setDescription(warns)
		.setTimestamp()
		.setFooter(versionString, avatarURL);
}

function reportEmbed(messageURL, reportedUser, reporter, messageContent) {
	return new Discord.MessageEmbed()
		.setColor("#ffcc4d")
		.setTitle("A message was reported!")
		.setDescription(messageContent)
		.addField("Reported user", reportedUser, true)
		.addField("Reporter", reporter, true)
		.addField("Message link", messageURL, true)
		.setTimestamp()
		.setFooter(versionString, avatarURL);
}

function reportActionEmbed(title, messageContent, actionTakenBy) {
	return new Discord.MessageEmbed()
		.setColor("#ffcc4d")
		.setTitle(title)
		.setDescription(messageContent)
		.addField("Action taken by", actionTakenBy, true)
		.setTimestamp()
		.setFooter(versionString, avatarURL);
}
