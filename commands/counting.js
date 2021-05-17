// Copyright (C) 2020-2021 vtheskeleton

const config = require("../config.json");
require("dotenv").config();
var mysql = require("mysql");
var sql = "";
module.exports = {
	name: "counting",
	description: "Make VukkyBot tell things about counting!",
	cooldown: 0,
	guildOnly: true,
	requiredAPIs: ["mysql"],
	usage: "<highscore or current>",
	execute(message, args) {
		var con = mysql.createConnection({
			host: process.env.SQL_HOST,
			user: process.env.SQL_USER,
			password: process.env.SQL_PASS,
			database: process.env.SQL_DB
		});
              
		con.connect(function(err) {
			if (err) console.log(err);
		});
		
		if(args[0] == "highscore") {
			sql = `SELECT highscore FROM counting WHERE (serverid = ${message.guild.id})`;
			con.query(sql, function (err, result) {
				message.channel.send(`Highscore: ${result[0].highscore}`);
				con.end();
			});
		} else {
			if(args[0] == "current") {
				sql = `SELECT number FROM counting WHERE (serverid = ${message.guild.id})`;
				con.query(sql, function (err, result) {
					message.channel.send(`Current Number: ${result[0].number}`);
					con.end();
				});
			} else {
				sql = `SELECT highscore FROM counting WHERE (serverid = ${message.guild.id})`;
				con.query(sql, function (err, result) {
					message.channel.send(`Highscore: ${result[0].highscore}`);
					con.end();
				});
			}
		}

	},
};
