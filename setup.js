var inquirer = require('inquirer');
var fs = require('fs');
console.log("Welcome to the interactive VukkyBot Setup tool.")

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
    console.log('This is the information you have given:');
    console.log(JSON.stringify(answers, null, '  '));
    fs.writeFile('.env', `BOT_TOKEN=${answers.token}\nPREFIX=${answers.prefix}`, function (err) {
        if (err) return console.log(err);
    });
});