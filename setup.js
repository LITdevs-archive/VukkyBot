var inquirer = require('inquirer');
var fs = require('fs');
var chalk = require('chalk');

console.log(chalk.blueBright("Welcome to the interactive VukkyBot Setup tool."))

var questions = [
    {
        type: 'confirm',
        name: 'launch',
        message: 'Start VukkyBot after setup is complete?'
    },
    {
        type: 'input',
        name: 'prefix',
        message: 'What\'s the prefix for your VukkyBot going to be?',
        default: 'v!',
    },
    {
        type: 'confirm',
        name: 'prefixreminder',
        message: 'Do you want your VukkyBot to remind you of its prefix when pinged?',
    },
    {
        type: 'input',
        name: 'token',
        message: 'What\'s your bot token?'
    },
    {
        type: 'input',
        name: 'discordid',
        message: 'What\'s your Discord ID?'
    },
    {
        type: 'input',
        name: 'sqlhost',
        message: 'What\'s your SQL hostname?'
    },
    {
        type: 'input',
        name: 'sqlpass',
        message: 'What\'s your SQL password?'
    },
    {
        type: 'input',
        name: 'sqluser',
        message: 'What\'s your SQL username?'
    },
    {
        type: 'input',
        name: 'sqldb',
        message: 'What\'s your SQL database name?'
    }
];
  
inquirer.prompt(questions).then((answers) => {
    const ora = require('ora');
    const spinner1 = ora('Saving to .env').start();
    try {
        fs.writeFile('.env', `BOT_TOKEN=${answers.token}\nPREFIX=${answers.prefix}\nSQL_HOST=${answers.sqlhost}\nSQL_PASS=${answers.sqlpass}\nSQL_USER=${answers.sqluser}\nSQL_DB=${answers.sqldb}`, function (err) {
            if (err) {
                spinner1.fail("Saving to .env failed")
                console.log(err)
            } else {
                spinner1.succeed("Saved to .env")
            }
        });
    } catch (err) {
        spinner1.fail("Saving to .env failed")
        console.log(err)
    }
    const spinner2 = ora('Saving to config.json').start();
    try {
        const config = require("./config.json")
        config.misc.owner = answers.discordid
        config.misc.prefixReminder = answers.prefixreminder
        fs.writeFile('config.json', JSON.stringify(config, null, 4), function (err) {
            if (err) {
                spinner2.fail("Saving to config.json failed")
                console.log(err)
            } else {
                spinner2.succeed("Saved to config.json")
            }
        });
    } catch (err) {
        spinner2.fail("Saving to config.json failed")
        console.log(err)
    }
    con.connect(function(err) {
        if (err) throw err; 
        console.log("Connected to the database to create table!");
        let sql = "CREATE TABLE warnings (uid VARCHAR(255), reason VARCHAR(255), id INT AUTO_INCREMENT PRIMARY KEY)";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
      
      });
    if (answers.launch == true) {
        const spinner3 = ora('Starting VukkyBot').start();
        try {
            const npm = require('npm');
            npm.load(() => {
                npm.run('start');
            });
            spinner3.succeed("VukkyBot should start now")
        } catch (err) {
            spinner3.fail("Couldn't start VukkyBot")
            console.log(err)
        }
    }
});