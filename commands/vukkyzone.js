const embeds = require("../embeds.js");

module.exports = {
	name: 'vukkyzone',
	description: 'Start a Vukky Zone.',
	dcPermissions: ['EMBED_LINKS', 'ADD_REACTIONS', 'MANAGE_MESSAGES'],
	execute(message, args) {
        message.delete()
        message.channel.send(`**Welcome to the Vukky Zone!** (started by <@${message.author.id}>)\nReact with ✨ to join, or 💥 to destroy.`).then(vukkyzone => {
            vukkyzone.react('✨').then(() => vukkyzone.react('💥'));
            const filter = (reaction, user) => {
                return ['💥', '✨'].includes(reaction.emoji.name) && user.bot == false
            };
            
            vukkyzone.awaitReactions(filter, { max: 1 })
                .then(collected => {
                    const reaction = collected.first();
                    vukkyzone.edit(`💥 **Boom!** The Vukky Zone was destroyed.\n${vukkyzone.reactions.cache.get('✨').count - 1} user(s) entered before the Vukky Zone was destroyed.`)
                    vukkyzone.reactions.removeAll()
                })
        })
	},
};
