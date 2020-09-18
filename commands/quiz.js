module.exports = {
	name: 'quiz',
	description: 'Let\'s play a quiz!',
	execute(message, args) {
        console.log("Let's play a quiz!")
        const quiz = require('./quiz.json');
        const item = quiz[Math.floor(Math.random() * quiz.length)];
        const filter = response => {
            return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
        };
        console.log(`I'm picking "${item.question}" and the answers for it are ${item.answers}`)
        
        message.channel.send(item.question).then(() => {
            message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                .then(collected => {
                    message.channel.send(`${collected.first().author} got the correct answer!`);
                    wannaPlayAgain(message, args)
                })
                .catch(collected => {
                    message.channel.send('Looks like nobody got the answer this time.');
                    wannaPlayAgain(message, args)
                });
        });

        function wannaPlayAgain(message, args) {
            message.channel.send("Wanna play again?").then((confirmMessage) => {
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
                            confirmMessage.channel.send("Okay! There's always next time, I guess.");
                        }
                    })
                    .catch(collected => {
                        confirmMessage.channel.send("Hm! I don't think anyone wants to play again...");
                });
            });
        }
	},
};