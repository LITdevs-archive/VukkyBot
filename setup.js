var inquirer = require('inquirer');
var fs = require('fs');
var chalk = require('chalk');

console.log(chalk.blueBright("Welcome to the interactive VukkyBot Setup tool."))

var questions = [
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
        type: 'confirm',
        name: 'launch',
        message: 'Start VukkyBot after setup is complete?'
    },
];
  
inquirer.prompt(questions).then((answers) => {
    const ora = require('ora');
    const spinner = ora('Saving to .env').start();
    try {
        fs.writeFile('.env', `BOT_TOKEN=${answers.token}\nPREFIX=${answers.prefix}`, function (err) {
            if (err) {
                spinner.fail("Saving failed")
                console.log(err)
            }
        });
        spinner.succeed("Saved to .env")
    } catch (err) {
        spinner.fail("Saving to .env failed")
        console.log(err)
    }
    if (answers.launch == true) {
        const spinner = ora('Starting VukkyBot').start();
        try {
            const npm = require('npm');
            npm.load(() => {
                npm.run('start');
            });
            spinner.succeed("VukkyBot should start now")
        } catch (err) {
            spinner.fail("Couldn't start VukkyBot")
            console.log(err)
        }
    }
});