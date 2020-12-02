const config = require("../config.json");
require("dotenv").config();
var mysql = require("mysql");
const { errorEmbed, successEmbed } = require("../embeds.js");
var sql = "";
module.exports = {
	name: "delwarn",
	description: "Make VukkyBot remove warnings from people!",
	botPermissions: ["EMBED_LINKS", "MANAGE_MESSAGES"],
	userPermissions: ["MANAGE_MESSAGES"],
	args: true,
	cooldown: 0,
	guildOnly: true,
	mysql: true,
	usage: "<warning id>",
	aliases: ["delwarning", "deletewarning", "deletewarn"],
	execute(message, args) {
		let warningId = args[0];
		if (isNaN(warningId)) return message.channel.send(errorEmbed(`Please specify the **ID** of the warning you wish to remove.\n${warningId} is not a warning ID.`));
		var con = mysql.createConnection({
			host: process.env.SQL_HOST,
			user: process.env.SQL_USER,
			password: process.env.SQL_PASS,
			database: process.env.SQL_DB
		});
              
		con.connect(function(err) {
			if (err) console.log(err);
		});
		
		sql = `SELECT * FROM warnings WHERE (id = ${warningId} AND serverid = ${message.guild.id})`;
		con.query(sql, function (err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				if (result.length <= 0) {
					con.end();
					return message.channel.send(errorEmbed("There is no warning with this ID!"));
					
				} else {
					
					sql = `DELETE FROM warnings WHERE (id = ${warningId} AND serverid = ${message.guild.id})`;
					con.query(sql, function (err, result) {
						if (err)  {
							message.channel.send(errorEmbed("An error has occurred! See logs for more information."));
							console.log(err);
							con.end();
						} else {
							message.channel.send(successEmbed(`The warning with the ID of **${warningId}** has been removed.`));
							console.log("1 warning removed");
							con.end();
						}
					});
				}
			}
		});
	},
};
