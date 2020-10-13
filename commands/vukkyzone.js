const embeds = require("../embeds.js");

module.exports = {
	name: 'vukkyzone',
	description: 'Start a Vukky Zone.',
    dcPermissions: ['EMBED_LINKS', 'ADD_REACTIONS', 'MANAGE_MESSAGES'],
    aliases: ['zone'],
	execute(message, args) {
        message.delete()
        message.channel.send(`**Welcome to the Vukky Zone!** (started by <@${message.author.id}>)\nReact with ✨ to join the Vukky Zone, or 💥 to blow it up so no one can enter it anymore.`).then(vukkyzone => {
            vukkyzone.react('✨').then(() => vukkyzone.react('💥'));
            const filter = (reaction, user) => {
                return ['💥'].includes(reaction.emoji.name) && user.bot == false
            };
            
            vukkyzone.awaitReactions(filter, { max: 1 })
                .then(collected => {
                    const reaction = collected.first();
                    var userCount = vukkyzone.reactions.cache.get('✨').count - 1
                    reaction.remove()
                    vukkyzone.edit("🤔 Something very bad is happening to the Vukky Zone...\nReact with ✨ to join.")
                    setTimeout(() => { 
                        vukkyzone.edit("😮 The Vukky Zone suddenly started shaking...\nReact with ✨ to join.")
                    }, 8000);
                    setTimeout(() => { 
                        userCount = vukkyzone.reactions.cache.get('✨').count - 1
                        vukkyzone.edit("😬 The entrance to the Vukky Zone was suddenly closed!")
                        vukkyzone.reactions.removeAll()
                    }, 12000);
                    setTimeout(() => {  
                        vukkyzone.edit(`💥 **Boom!** The Vukky Zone was blown up!\n${userCount} user(s) entered the Vukky Zone before it was destroyed.`) 
                        vukkyzone.reactions.removeAll()
                    }, 18000);
                })
        })
	},
};
