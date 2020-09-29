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
    }
];
  
inquirer.prompt(questions).then((answers) => {
    fs.writeFile('.env', `BOT_TOKEN=${answers.token}\nPREFIX=${answers.prefix}`, function (err) {
        if (err) return console.log(err);
    });
});