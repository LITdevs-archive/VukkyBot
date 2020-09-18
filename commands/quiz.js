module.exports = {
	name: 'quiz',
	description: 'Let\'s play a quiz!',
	execute(message, args) {
		message.react("🤔")
        const quiz = require('./quiz.json');
        const item = quiz[Math.floor(Math.random() * quiz.length)];
        const filter = response => {
            return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
        };
        
        message.channel.send(item.question).then(() => {
            message.channel.awaitMessages(filter, { maxMatches: 1, time: 15000, errors: ['time'] })
                .then(collected => {
                    message.react("✅")
                    message.channel.send(`${collected.first().author} got the correct answer!`);
                })
                .catch(collected => {
                    message.react("❌")
                    message.channel.send('Looks like nobody could figure out the answer this time.');
                });
        });
	},
};