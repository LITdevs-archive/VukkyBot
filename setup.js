let inquirer = require("inquirer");
let fs = require("fs");
let chalk = require("chalk");
const ora = require("ora");

let mysql = require("mysql");
console.log(chalk.blueBright("Thanks for picking VukkyBot! Let's get started..."));

let sql;

async function isTokenValid(token) {
	console.log(chalk.blueBright("\nValidating your token..."));
	const spinner = ora("Connecting to the Discord API").start();
	try {
		const Discord = require("discord.js");
		const client = new Discord.Client();
		await client.login(token);
		client.destroy();
		spinner.succeed("Token is valid");
		return true;
	} catch {
		spinner.fail("Token appears to be invalid");
		return false;
	}
}

let questions = [
	{
		type: "confirm",
		name: "launch",
		message: "Start VukkyBot after setup is complete?"
	},
	{
		type: "input",
		name: "prefix",
		message: "What's the prefix for your VukkyBot going to be?",
		default: "v!",
	},
	{
		type: "checkbox",
		name: "extrafeatures",
		message: "What extra features would you like?",
		choices: [
			{ name: "MySQL features (MySQL database required)", value: "mysql" },
			{ name: "Invalid command reminders", value: "invalidcmd" },
			{ name: "Prefix reminders", value: "prefixremind" },
		]
	},
	{
		type: "checkbox",
		name: "mysqlfeatures",
		message: "What MySQL features would you like? Warns are always on.",
		choices: [
			{ name: "Counting", value: "counting" }
		],
		when: function (answers) {
			return answers.extrafeatures !== undefined && answers.extrafeatures.includes("mysql");
		},
	},
	{
		type: "password",
		name: "token",
		message: "What's your bot token?",
		validate: isTokenValid,
		mask: true
	},
	{
		type: "input",
		name: "discordid",
		message: "What's your Discord ID?"
	},
	{
		type: "input",
		name: "countingchannel",
		message: "What is the name of the channel you would like VukkyBot to count in?",
		default: "counting",
		when: function (answers) {
			return answers.mysqlfeatures !== undefined && answers.mysqlfeatures.includes("counting");
		}
	},
	{
		type: "input",
		name: "sqlhost",
		message: "What's your SQL hostname?",
		when: function (answers) {
			return answers.extrafeatures !== undefined && answers.extrafeatures.includes("mysql");
		},
	},
	{
		type: "password",
		name: "sqlpass",
		message: "What's your SQL password?",
		when: function (answers) {
			return answers.extrafeatures !== undefined && answers.extrafeatures.includes("mysql");
		},
	},
	{
		type: "input",
		name: "sqluser",
		message: "What's your SQL username?",
		when: function (answers) {
			return answers.extrafeatures !== undefined && answers.extrafeatures.includes("mysql");
		},
	},
	{
		type: "input",
		name: "sqldb",
		message: "What's your SQL database name?",
		when: function (answers) {
			return answers.extrafeatures !== undefined && answers.extrafeatures.includes("mysql");
		},
	}
];
  
inquirer.prompt(questions).then((answers) => {
	saveToEnv();

	function saveToEnv() {
		const spinner1 = ora("Saving credentials to .env").start();
		try {
			fs.writeFile(".env", `BOT_TOKEN=${answers.token}\nPREFIX=${answers.prefix}\nSQL_HOST=${answers.sqlhost}\nSQL_PASS=${answers.sqlpass}\nSQL_USER=${answers.sqluser}\nSQL_DB=${answers.sqldb}`, function (err) {
				if (err) {
					spinner1.fail("Saving credentials to .env failed");
					console.log(err);
					process.exit(1);
				} else {
					spinner1.succeed("Saved credentials to .env"); 
					saveToConfig();
				}
			});
		} catch (err) {
			spinner1.fail("Saving credentials to .env failed");
			console.log(err);
			process.exit(1);
		}
	}

	function saveToConfig() {
		const spinner2 = ora("Saving configuration to config.json").start();
		try {
			const config = require("./config.json");
			config.misc.owner = answers.discordid;
			config.misc.invalidCmdReminder = answers.extrafeatures !== undefined && answers.extrafeatures.includes("invalidcmd");
			config.misc.prefixReminder = answers.extrafeatures !== undefined && answers.extrafeatures.includes("prefixremind");
			config.misc.mysql = answers.extrafeatures !== undefined && answers.extrafeatures.includes("mysql");
			if (answers.mysqlfeatures !== undefined && answers.mysqlfeatures.includes("counting")) { config.counting.enabled = answers.mysqlfeatures.counting !== null; } else { config.counting.enabled = false; }
			if (answers.mysqlfeatures !== undefined && answers.mysqlfeatures.counting !== undefined) { config.counting.channelName = answers.countingchannel; }
			fs.writeFile("config.json", JSON.stringify(config, null, 4), function (err) {
				if (err) {
					spinner2.fail("Saving configuration to config.json failed");
					console.log(err);
					process.exit(1);
				} else {
					spinner2.succeed("Saved configuration to config.json");
					startMySQL();
				}
			});
		} catch (err) {
			spinner2.fail("Saving configuration to config.json failed");
			console.log(err);
			process.exit(1);
		}
	}

	function startMySQL() {
		if(answers.extrafeatures.mysql) {
			const spinner4 = ora("Connecting to the database").start();
		
			let con = mysql.createConnection({
				host: answers.sqlhost,
				user: answers.sqluser,
				password: answers.sqlpass,
				database: answers.sqldb
			});
			con.connect(function (err) {
				if (err) {
					spinner4.fail("Failed to connect to the database");
					console.log(err);
					process.exit(1);
				} else {
					spinner4.succeed("Connected to the database");
					const spinner5 = ora("Creating table in the database").start();
					sql = "CREATE TABLE warnings (username VARCHAR(255), serverid VARCHAR(255), uid VARCHAR(255), reason VARCHAR(255), id INT AUTO_INCREMENT PRIMARY KEY)";
					con.query(sql, function (err, result) {
						if (err) {
							if (err.code == "ER_TABLE_EXISTS_ERROR") {
								spinner5.warn("Table already exists in the database");
							} else {
								spinner5.fail("Failed to create table in the database");
								console.log(err);
							}
						} else {
							spinner5.succeed("Created table in the database");
						}
						launchyBotty();
					});
				}
			});
		} else {
			launchyBotty();
		}
	}

	// eslint-disable-next-line no-inner-declarations
	function launchyBotty() {
		if (answers.launch) {
			const spinner3 = ora("Starting VukkyBot").start();
			try {
				const npm = require("npm");
				npm.load(() => {
					npm.run("start");
				});
				spinner3.succeed("VukkyBot should start now");
			} catch (err) {
				spinner3.fail("Couldn't start VukkyBot");
				console.log(err);
			}
		} else {
			process.exit(0);
		}
	}
});