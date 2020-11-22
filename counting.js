var chalk = require("chalk");
var mysql = require("mysql");
var config = require("./config.json");
require("dotenv").config();
var sql;

const error = chalk.bold.red;
const warn = chalk.yellow;
const success = chalk.green;
const info = chalk.blue;

module.exports = {
	start: function() {
		if(!config.counting.enabled) return console.log(`[counting] ${error("Counting is disabled!")}`);
		if(!config.misc.mysql) return console.log(`[counting] ${error("MySQL is not enabled. MySQL is required for counting.")}`);
		
		let con = mysql.createConnection({
			host: process.env.SQL_HOST,
			user: process.env.SQL_USER,
			password: process.env.SQL_PASS,
			database: process.env.SQL_DB
		});

		con.connect(function(err) {
			if (err) {
				return console.log(`[counting] ${error("SQL connection failed. Maybe the credentials are invalid?")}`);
			} else {
				con.end();
			}
		});
		console.log(`[counting] ${success("Counting is enabled and SQL credentials are valid!")}`);
	}
};