const embeds = require("../embeds.js");

module.exports = {
	name: 'quiz',
    description: 'Let\'s play a quiz!',
    dcPermissions: ['EMBED_LINKS', 'ADD_REACTIONS'],
    aliases: ['trivia'],
	execute(message, args) {
        console.log("Let's play a quiz!")
        const quiz = require('./quiz.json');
        const config = require('../config.json');
        const item = quiz[Math.floor(Math.random() * quiz.length)];
        const filter = response => {
            return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
        };

        // customization
        const quizTimeSeconds = config.commands.quiz.timeSeconds

        console.log(`I'm picking "${item.question}" and the answers for it are ${item.answers}.\nThe hint for it is ${item.hint} and it was made by ${item.author}.\nIts categories are ${item.categories}.`)
        
        message.channel.send(embeds.quizStartEmbed(item.question, quizTimeSeconds, item.hint, item.author, item.categories)).then(() => {
            message.channel.awaitMessages(filter, { max: 1, time: quizTimeSeconds * 1000, errors: ['time'] })
                .then(collected => {
                    message.channel.send(embeds.quizWinnerEmbed(collected.first()));
                    wannaPlayAgain(message, args)
                })
                .catch(collected => {
                    message.channel.send(embeds.quizLoseEmbed(`Hm! That question might have been too hard.\nThe answers for it were ||${item.answers.join(", ")}||.`));
                    wannaPlayAgain(message, args)
                });
        });

        function wannaPlayAgain(message, args) {
            message.channel.send(embeds.inputEmbed("Wanna play again?")).then((confirmMessage) => {
                confirmMessage.react('👍').then(() => confirmMessage.react('👎'));
                const filter = (reaction, user) => {
                    return ['👍', '👎'].includes(reaction.emoji.name) && user.bot === false
                };
                confirmMessage.awaitReactions(filter, { max: 1, time: 15000, errors: ['time'] })
                    .then(collected => {
                        const reaction = collected.first();
                        if (reaction.emoji.name === '👍') {
                            message.client.commands.get("quiz").execute(message, args)
                        } else {
                            confirmMessage.channel.send(embeds.infoEmbed("Okay! There's always next time, I guess."));
                        }
                    })
                    .catch(collected => {
                        confirmMessage.channel.send("Hm! I don't think anyone wants to play again...");
                });
            });
        }
	},
};