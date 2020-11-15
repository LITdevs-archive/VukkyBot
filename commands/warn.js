const config = require("../config.json");
require("dotenv").config();
var mysql = require("mysql");
const { errorEmbed, successEmbed } = require("../embeds.js");

function everythingIsFine(message, mentionedUser, args) {
	var con = mysql.createConnection({
		host: process.env.SQL_HOST,
		user: process.env.SQL_USER,
		password: process.env.SQL_PASS,
		database: process.env.SQL_DB
	});
			
	con.connect(function(err) {
		if (err) console.log(err);
	});
			
	let sql = `INSERT INTO warnings (username, serverid, uid, reason) VALUES ('${mentionedUser.username}', ${message.guild.id} , ${mentionedUser.id}, '${args.slice(1).join(" ")}')`;
	con.query(sql, function (err, result) {
		if (err)  {
			message.channel.send(errorEmbed("An error has occurred! See logs for more information."));
			console.log(err);
			con.end();
		} else {
			message.channel.send(successEmbed(`Warning added to ${mentionedUser} for reason ${args.slice(1).join(" ")}!`));
			console.log("1 warning added");
			con.end();
		}
	});
}

module.exports = {
	name: "warn",
	description: "Make VukkyBot give people warnings!",
	botPermissions: ["EMBED_LINKS", "MANAGE_MESSAGES"],
	usage: "<@user> <reason>",
	cooldown: 0,
	mysql: true,
	guildOnly: true,
	execute(message, args) {
		if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(errorEmbed("You need the Manage Messages permission to do that!"));
		if (args.slice(1).join(" ").length < 1) return message.channel.send(errorEmbed(`I was expecting more arguments!\nUsage: \`${process.env.PREFIX}warn <@user> <reason>\``));
		let mentionedUser;
		if (message.guild.member(message.mentions.users.first())) {
			mentionedUser = message.guild.member(message.mentions.users.first()).user;
			everythingIsFine(message, mentionedUser, args);
		} else {
			if (message.client.users.fetch(args[0])) {
				mentionedUser = message.client.users.fetch(args[0]).then(function (res) {
					mentionedUser = res;
					everythingIsFine(message, mentionedUser, args);
				});
			}
		}
		
	},
};
