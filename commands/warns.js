const config = require("../config.json");
require("dotenv").config();
var mysql = require("mysql");
const { errorEmbed, warnsUserEmbed } = require("../utilities/embeds.js");
const vukkytils = require("../utilities/vukkytils");


module.exports = {
	name: "warns",
	description: "View warnings created using VukkyBot",
	botPermissions: ["EMBED_LINKS", "MANAGE_MESSAGES"],
	userPermissions: ["MANAGE_MESSAGES"],
	args: true,
	mysql: true,
	guildOnly: true,
	usage: "<@user | user id>",
	aliases: ["warnings"],
	execute(message, args) {
		let warnsId;    
		if (isNaN(args.slice(0).join(" "))) {
			let mentionedUser = message.guild.member(message.mentions.users.first());
			warnsId = mentionedUser.id;
		} else {
			warnsId = args.slice(0).join(" ");
		}
		var con = mysql.createConnection({
			host: process.env.SQL_HOST,
			user: process.env.SQL_USER,
			password: process.env.SQL_PASS,
			database: process.env.SQL_DB
		});
          
		con.connect(function(err) {
			if (err) console.log(err);
		});
          
		let sql = `SELECT * FROM warnings WHERE (uid = ${warnsId} AND serverid = ${message.guild.id})`;
		con.query(sql, function (err, result) {
			if (err)  {
				message.channel.send(errorEmbed(`An error has occurred! ${err}`));
				console.log(err);
				con.end();
			} else {
				if (result.length == 0) { con.end(); return message.channel.send(warnsUserEmbed(message.mentions.users.first().username, vukkytils.getString("NO_WARNINGS"))); }
				let warnList = "";
				
				for (let i = 0; i < result.length; i++) {
					warnList = warnList.concat(`**${result[i].reason}** (ID: ${result[i].id})\n`);
				}
				message.channel.send(warnsUserEmbed(message.mentions.users.first().username, warnList));
				con.end();
			}
		});
        
	},
};
