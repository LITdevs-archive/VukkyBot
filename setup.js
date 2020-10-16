let inquirer = require("inquirer");
let fs = require("fs");
let chalk = require("chalk");

let mysql = require("mysql");
console.log(chalk.blueBright("Welcome to the interactive VukkyBot Setup tool."));

let sql;

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
		type: "confirm",
		name: "prefixreminder",
		message: "Do you want your VukkyBot to remind you of its prefix when pinged?",
	},
	{
		type: "input",
		name: "token",
		message: "What's your bot token?"
	},
	{
		type: "input",
		name: "discordid",
		message: "What's your Discord ID?"
	},
	{
		type: "confirm",
		name: "mysqlwarn",
		message: "Use MySQL database for warn command?"
	},
	{
		type: "input",
		name: "sqlhost",
		message: "What's your SQL hostname?",
		when: function (answers) {
			return answers.mysqlwarn !== false;
		},
	},
	{
		type: "input",
		name: "sqlpass",
		message: "What's your SQL password?",
		when: function (answers) {
			return answers.mysqlwarn !== false;
		},
	},
	{
		type: "input",
		name: "sqluser",
		message: "What's your SQL username?",
		when: function (answers) {
			return answers.mysqlwarn !== false;
		},
	},
	{
		type: "input",
		name: "sqldb",
		message: "What's your SQL database name?",
		when: function (answers) {
			return answers.mysqlwarn !== false;
		},
	}
];
  
inquirer.prompt(questions).then((answers) => {
	const ora = require("ora");
	const spinner1 = ora("Saving to .env").start();
	try {
		fs.writeFile(".env", `BOT_TOKEN=${answers.token}\nPREFIX=${answers.prefix}\nSQL_HOST=${answers.sqlhost}\nSQL_PASS=${answers.sqlpass}\nSQL_USER=${answers.sqluser}\nSQL_DB=${answers.sqldb}`, function (err) {
			if (err) {
				spinner1.fail("Saving to .env failed");
				console.log(err);
			} else {
				spinner1.succeed("Saved to .env");
				const spinner2 = ora("Saving to config.json").start();
				try {
					const config = require("./config.json");
					config.misc.owner = answers.discordid;
					config.misc.prefixReminder = answers.prefixreminder;
					config.misc.mysql = answers.mysqlwarn;
					fs.writeFile("config.json", JSON.stringify(config, null, 4), function (err) {
						if (err) {
							spinner2.fail("Saving to config.json failed");
							console.log(err);
						} else {
							spinner2.succeed("Saved to config.json");
							if(answers.mysqlwarn) {
								const spinner4 = ora("Connecting to the database").start();
                            
								let con = mysql.createConnection({
									host: answers.sqlhost,
									user: answers.sqluser,
									password: answers.sqlpass,
									database: answers.sqldb
								});
								con.connect(function(err) {
									if (err) {
										spinner4.fail("Failed to connect to the database");
										console.log(err);
									} else {
										spinner4.succeed("Connected to the database");
										const spinner5 = ora("Creating table in the database").start();
										sql = "CREATE TABLE warnings (username VARCHAR(255), uid VARCHAR(255), reason VARCHAR(255), id INT AUTO_INCREMENT PRIMARY KEY)";
										con.query(sql, function (err, result) {
											if (err) {
												spinner5.fail("Failed to create table in the database");
												console.log(err);
											} else {
												spinner5.succeed("Created table in the database");
											}
										});
									}
								});
							}
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
							}
						}
					});
				} catch (err) {
					spinner2.fail("Saving to config.json failed");
					console.log(err);
				} 
			}
		});
	} catch (err) {
		spinner1.fail("Saving to .env failed");
		console.log(err);
	}
    
});