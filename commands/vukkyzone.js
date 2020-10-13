const embeds = require("../embeds.js");

module.exports = {
	name: 'vukkyzone',
	description: 'Start a Vukky Zone.',
    dcPermissions: ['EMBED_LINKS', 'ADD_REACTIONS', 'MANAGE_MESSAGES'],
    aliases: ['zone'],
    guildOnly: true,
	execute(message, args) {
        message.delete()
        message.channel.send(`**Welcome to the Vukky Zone!** (started by <@${message.author.id}>)\nReact with ✨ to join the Vukky Zone, or 💥 to close itpm so no one can enter it anymore.`).then(vukkyzone => {
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
                        var randomEvent = Math.round(Math.random())
                        if(randomEvent == 1) {
                            vukkyzone.edit(`💥 **Boom!** The Vukky Zone was blown up!\n${userCount} people died inside it, because they decided to join.`) 
                        } else {
                            vukkyzone.edit(`🦠 **cough cough** The Vukky Zone was closed due to COVID-19!\n${userCount} people got a severe case and died...`) 
                        }
                        vukkyzone.reactions.removeAll()
                    }, 18000);
                })
        })
	},
};
