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
        type: 'confirm',
        name: 'prefixreminder',
        message: 'Do you want your VukkyBot to remind you of its prefix when pinged?',
    }
];
  
inquirer.prompt(questions).then((answers) => {
    const ora = require('ora');
    const spinner1 = ora('Saving to .env').start();
    try {
        fs.writeFile('.env', `BOT_TOKEN=${answers.token}\nPREFIX=${answers.prefix}`, function (err) {
            if (err) {
                spinner1.fail("Saving to .env failed")
                console.log(err)
            }
        });
        spinner1.succeed("Saved to .env")
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
            }
            else spinner2.succeed("Saved to config.json")
        });
    } catch (err) {
        spinner2.fail("Saving to config.json failed")
        console.log(err)
    }
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