// Copyright (C) 2020-2021 Vukky, Gravity Assist

const Discord = require("discord.js");
const pjson = require("../package.json");
const config = require("../config.json");
let avatarURL = "https://i.imgur.com/H0sAkrl.png";
let versionString = `v${pjson.version} (discord.js ${pjson.dependencies["discord.js"].substring(1)})`;

const vukkytils = require("./vukkytils");
const format = require("util").format;

module.exports = {
	versionString,
	getAvatarURL,
	setAvatarURL,
	errorEmbed,
	warningEmbed,
	infoEmbed,
	successEmbed,
	inputEmbed
};

function setAvatarURL(url) {
	avatarURL = url;
}
function getAvatarURL() {
	return avatarURL;
}

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