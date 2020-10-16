const config = require("../config.json");
require("dotenv").config();
var mysql = require("mysql");
const { errorEmbed, successEmbed } = require("../embeds.js");



module.exports = {
	name: "delwarn",
	description: "Make VukkyBot remove warnings from people!",
	dcPermissions: ["EMBED_LINKS", "MANAGE_MESSAGES"],
	args: true,
	usage: "<warning id>",
	aliases: ["delwarning", "deletewarning", "deletewarn"],
	execute(message, args) {
		if (config.commands.warn.mysql) {
			if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(errorEmbed("You need the Manage Messages permission to do that!"));
			let warningId = args[0];
			if (isNaN(warningId)) return message.channel.send(errorEmbed("Please specify the **id** of the warning you wish to remove."));
			var con = mysql.createConnection({
				host: process.env.SQL_HOST,
				user: process.env.SQL_USER,
				password: process.env.SQL_PASS,
				database: process.env.SQL_DB
			});
              
			con.connect(function(err) {
				if (err) console.log(err);
			});
			let sql = `DELETE FROM warnings WHERE id = ${warningId}`;
			con.query(sql, function (err, result) {
				if (err)  {
					message.channel.send(errorEmbed("An error has occurred! See logs for more information."));
					console.log(err);
					con.end();
				} else {
					message.channel.send(successEmbed(`Warning removed with id: ${warningId}!`));
					console.log("1 warning removed");
					con.end();
				}
			});
		}
	},
};
