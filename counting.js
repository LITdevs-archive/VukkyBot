var chalk = require("chalk");
var mysql = require("mysql");
var config = require("./config.json");
var vukkytils = require("./vukkytils");
require("dotenv").config();
var sql;

const error = chalk.bold.red;
const warn = chalk.yellow;
const success = chalk.green;
const info = chalk.blue;
var servers = {};
var cheader = `[${vukkytils.getString("COUNTING")}]`;

function isInt(value) {
	let x = parseFloat(value);
	return !isNaN(value) && (x | 0) === x;
}

module.exports = {
	start: function(client) {
		if(client.user.username.toLowerCase().includes("dev")) return console.log(`${cheader} ${error("Counting is disabled because you're on a developer bot!")}`);
		if(!config.counting.enabled) return console.log(`${cheader} ${error("Counting is disabled!")}`);
		if(!config.misc.mysql) return console.log(`${cheader} ${error("MySQL is not enabled. MySQL is required for counting.")}`);
		
		let con = mysql.createConnection({
			host: process.env.SQL_HOST,
			user: process.env.SQL_USER,
			password: process.env.SQL_PASS,
			database: process.env.SQL_DB
		});

		con.connect(function(err) {
			if (err) {
				return console.log(`${cheader} ${error("SQL connection failed. Maybe the credentials are invalid?")}`);
			} else {
				console.log(`${cheader} ${info("Connected to the database")}`);

				sql = "CREATE TABLE counting (serverid VARCHAR(255), number VARCHAR(255), lastcounter VARCHAR(255), highscore VARCHAR(255), id INT AUTO_INCREMENT PRIMARY KEY)";
				con.query(sql, function (err, result) {
					if (err) {
						if(err.code == "ER_TABLE_EXISTS_ERROR") {
							console.log(`${cheader} ${warn("Table already exists")}`);
						} else {
							console.log(`${cheader} ${error("Table creation failed")} (probably already exists)`);
						}
					} else {
						console.log(`${cheader} ${success("Table created")}`);
					}
				});

				client.guilds.cache.forEach(server => {
					let con = mysql.createConnection({
						host: process.env.SQL_HOST,
						user: process.env.SQL_USER,
						password: process.env.SQL_PASS,
						database: process.env.SQL_DB
					});
					let serverid = server.id.toString();
					let servername = server.name;
					sql = `SELECT * FROM counting WHERE serverid = ${server.id}`;
					con.query(sql, function (err, result) {
						if (err) {
							console.log(`${cheader} ${error("Something went wrong in the counting startup!")}`);
							console.log(err);
						} else {
							if (result.length <= 0) {
								sql = `INSERT INTO counting(serverid, number, lastcounter, highscore) VALUES (${server.id}, 0, 0, 0)`;
								con.query(sql, function (err, result) {
									if (err) {
										console.log(`${cheader} ${error("Failed to create row for server with ID:")} ${server.id}`);
									}
										
									servers[serverid.toString()] = {};
									servers[serverid.toString()].id = serverid;
									servers[serverid.toString()].number = 0;
									servers[serverid.toString()].lastcounter = 0;
									servers[serverid.toString()].highscore = 0;
									
								});
							} else {
								servers[serverid.toString()] = {};
								servers[serverid.toString()].id = serverid;
								servers[serverid.toString()].number = result[0].number;
								servers[serverid.toString()].lastcounter = result[0].lastcounter;
								servers[serverid.toString()].highscore = result[0].highscore;
							}

						}
					});
				});
				
				con.end();
			}
			console.log(`${cheader} ${success("Counting is enabled and SQL credentials are valid!")}`);
		});
	},
	deletion(message) {
		if (!isInt(message.content)) return;
		message.channel.send("A message was deleted in this channel! The message was:");
		message.channel.send(message.content);
	},
	check(message, client) {
		let con = mysql.createConnection({
			host: process.env.SQL_HOST,
			user: process.env.SQL_USER,
			password: process.env.SQL_PASS,
			database: process.env.SQL_DB
		});
		let server = message.guild;
		let serverid = server.id.toString();
		let servername = server.name;
		sql = `SELECT * FROM counting WHERE serverid = ${server.id}`;
		con.query(sql, function (err, result) {
			if (err) {
				console.log(`${cheader} ${error("Something went wrong in the counting startup!")}`);
				console.log(err);
			} else {
				if (result.length <= 0) {
					con.connect(function(err) {
						if (err) {
							console.log(`${cheader} ${error("Failed to connect to the database")}`);
							console.log(err);
						} else {
							sql = `INSERT INTO counting(serverid, number, lastcounter, highscore) VALUES (${server.id}, 0, 0, 0)`;
							con.query(sql, function (err, result) {
								if (err) {
									console.log(`${cheader} ${error("Failed to create row for server with ID:")} ${server.id}`);
								}
							});
							servers[serverid].id = serverid;
							servers[serverid].number = 0;
							servers[serverid].lastcounter = 0;
							servers[serverid].highscore = 0;
						}
					});
				}
			}
		});
		con.end();


		// Start checking if number is correct

		con = mysql.createConnection({
			host: process.env.SQL_HOST,
			user: process.env.SQL_USER,
			password: process.env.SQL_PASS,
			database: process.env.SQL_DB
		});

		let checkString = message.content.split(" ")[0];

		if (isInt(checkString)) {
			if (message.author.id.toString() != servers[message.guild.id].lastcounter.toString()) {
				if (parseInt(checkString) == servers[message.guild.id].number + 1) {
					servers[message.guild.id].number = parseInt(checkString);
					servers[message.guild.id].lastcounter = message.author.id;
					sql = `UPDATE counting set number = ${parseInt(checkString)}, lastcounter = ${message.author.id} WHERE serverid = ${message.guild.id}`;
					con.query(sql, function (err, result) {
						if (err) {
							console.log(err);
							message.channel.send("Sorry, I've encountered an issue with the database.");
							con.end();
						} else {
							con.end();
						}
					});
					if (parseInt(checkString) > servers[serverid].highscore) {
						message.react("☑️");

						let con = mysql.createConnection({
							host: process.env.SQL_HOST,
							user: process.env.SQL_USER,
							password: process.env.SQL_PASS,
							database: process.env.SQL_DB
						});

						sql = `UPDATE counting set highscore = ${parseInt(checkString)} WHERE serverid = ${message.guild.id}`;
						con.query(sql, function (err, result) {
							if (err) {
								console.log(err);
								message.channel.send("Sorry, I've encountered an issue with the database. Please contact server staff if this happens again.");
								con.end();
							} else {
								con.end();
							}
						});
						servers[serverid].highscore = parseInt(checkString);
					} else {	
						message.react("✅");
					}
				} else {
					if (servers[message.guild.id].number == 0) return message.channel.send("Did you even try...");
					message.react("❌");
					message.channel.send(`<@${message.author.id}> screwed up! Wrong number!\nThe next number is **1**.\n The correct number number would have been **${parseInt(servers[message.guild.id].number) + 1}**.`);
					servers[message.guild.id].number = 0;
					servers[message.guild.id].lastcounter = 0;

					let con = mysql.createConnection({
						host: process.env.SQL_HOST,
						user: process.env.SQL_USER,
						password: process.env.SQL_PASS,
						database: process.env.SQL_DB
					});

					sql = `UPDATE counting set number = 0, lastcounter = 0 WHERE serverid = ${message.guild.id}`;
					con.query(sql, function (err, result) {
						if (err) {
							console.log(err);
							message.channel.send("Sorry, I've encountered an issue with the database. Please contact server staff if this happens again.");
							con.end();
						} else {
							con.end();
						}
					});
				}
			} else {
				
				message.react("❌");
				message.channel.send(`<@${message.author.id}> screwed up! You can't count twice in a row!\nThe next number is **1**.`);
				servers[message.guild.id].number = 0;
				servers[message.guild.id].lastcounter = 0;
				sql = `UPDATE counting set number = 0, lastcounter = 0 WHERE serverid = ${message.guild.id}`;
				con.query(sql, function (err, result) {
					if (err) {
						console.log(err);
						message.channel.send("Sorry, I've encountered an issue with the database. Please contact server staff.");
						con.end();
					} else {
						con.end();
					}
				});
			}
		}
		
	},
};
