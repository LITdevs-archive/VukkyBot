var chalk = require("chalk");
var mysql = require("mysql");
var config = require("./config.json");
const vukkytils = require("./vukkytils.js");
require("dotenv").config();
let sql;

const error = chalk.bold.red;
const warn = chalk.yellow;
const success = chalk.green;
const info = chalk.blue;
let cheader = `[${vukkytils.getString("COUNTING")}]`;

module.exports = {
	start: function() {
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
				console.log(`${cheader} ${error("Failed to connect to the database")}`);
				console.log(err);
			} else {
				console.log(`${cheader} ${success("Connected to the database")}`);
				sql = "CREATE TABLE counting (serverid VARCHAR(255), number VARCHAR(255), lastcounter VARCHAR(255), id INT AUTO_INCREMENT PRIMARY KEY)";
				con.query(sql, function (err, result) {
					if (err) {
						if(err.code == "ER_TABLE_EXISTS_ERROR") {
							console.log(`${cheader} ${warn("Table already exists")}`);
						} else {
							console.log(`${cheader} ${error("Table creation failed")} (probably already exists)`);
						}
						con.end();
					} else {
						console.log(`${cheader} ${success("Table created")}`);
						con.end();
					}
				});
			}
		});

	},
	countCheck: function (message) {
		if(!config.misc.mysql) return;
		if(!config.counting.enabled) return;
		let con = mysql.createConnection({
			host: process.env.SQL_HOST,
			user: process.env.SQL_USER,
			password: process.env.SQL_PASS,
			database: process.env.SQL_DB
		});

		sql = `SELECT * FROM counting WHERE serverid = ${message.guild.id}`;
		con.query(sql, function (err, result) {
			if (err) {
				console.log(`${cheader} ${error("Something went wrong while fetching the current number. Maybe it doesn't exist?")}`);
				con.end();
			} else {
				let currentNumber;
				let lastCounter;
				if (result.length <= 0) {
					console.log(`${cheader} ${info("Creating row for server...")}`);
					let con = mysql.createConnection({
						host: process.env.SQL_HOST,
						user: process.env.SQL_USER,
						password: process.env.SQL_PASS,
						database: process.env.SQL_DB
					});

					con.connect(function(err) {
						if (err) {
							console.log(`${cheader} ${error("Failed to connect to the database")}`);
							console.log(err);
						} else {
							sql = `INSERT INTO counting(serverid, number) VALUES (${message.guild.id}, 0)`;
							con.query(sql, function (err, result) {
								if (err) {
									console.log(`${cheader} ${error("Failed to create row")}`);
									con.end();
								} else {
									con.end();
								}
							});
						}
					});
					currentNumber = 0;
					lastCounter = 0;
				} else {
					currentNumber = result[0].number;
					lastCounter = result[0].lastcounter;
				}
				con.end();
				if (!message.content) return;
				if (message.content.split(" ")[0].includes("+") || message.content.split(" ")[0].includes("-") || message.content.split(" ")[0].includes("*") || message.content.split(" ")[0].includes("/")) return message.channel.send("Sorry, but I don't know how to do math yet.");
				if (!isNaN(message.content.split(" ")[0])) {
					if (parseInt(message.content.split(" ")[0]) == parseInt(currentNumber) + 1) {
						if (lastCounter != message.author.id) {
							currentNumber++;
							let con = mysql.createConnection({
								host: process.env.SQL_HOST,
								user: process.env.SQL_USER,
								password: process.env.SQL_PASS,
								database: process.env.SQL_DB
							});
							sql = `UPDATE counting set number = ${message.content.split(" ")[0]}, lastcounter = ${message.author.id} WHERE serverid = ${message.guild.id}`;
							con.connect(function(err) {
								if (err) {
									console.log(`${cheader} ${error("Something went wrong")}`);
									console.log(err);
								} else {
									con.query(sql, function (err, result) {
										if (err) {
											console.log(`${cheader} ${error("Something went wrong")}`);
											con.end();
										} else {
											con.end();
										}
									});
								}
							});
							if (currentNumber == 100) {
								message.react("💯");
							} else {
								message.react("✅");
							}
						} else {
							message.channel.send(`<@${message.author.id}> screwed up! You can't count twice in a row!\nThe next number is **1**.`);
							let con = mysql.createConnection({
								host: process.env.SQL_HOST,
								user: process.env.SQL_USER,
								password: process.env.SQL_PASS,
								database: process.env.SQL_DB
							});
							sql = `UPDATE counting set number = 0, lastcounter = 0 WHERE serverid = ${message.guild.id}`;
							con.connect(function(err) {
								if (err) {
									console.log(`${cheader} ${error("Something went wrong")}`);
									console.log(err);
								} else {
									con.query(sql, function (err, result) {
										if (err) {
											console.log(`${cheader} ${error("Something went wrong")}`);
											con.end();
										} else {
											con.end();
										}
									});
								}
							});
							message.react("❌");
						}
					} else {
						message.channel.send(`<@${message.author.id}> screwed up! The correct number would have been **${parseInt(currentNumber) + 1}**.\nThe next number is **1**.`);
						let con = mysql.createConnection({
							host: process.env.SQL_HOST,
							user: process.env.SQL_USER,
							password: process.env.SQL_PASS,
							database: process.env.SQL_DB
						});
						sql = `UPDATE counting set number = 0, lastcounter = 0 WHERE serverid = ${message.guild.id}`;
						con.connect(function(err) {
							if (err) {
								console.log(`${cheader} ${error("Something went wrong")}`);
								console.log(err);
							} else {
								con.query(sql, function (err, result) {
									if (err) {
										console.log(`${cheader} ${error("Something went wrong")}`);
										con.end();
									} else {
										con.end();
									}
								});
							}
						});
                
					}
				}
			}
		});

	}
};
