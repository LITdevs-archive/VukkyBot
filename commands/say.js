const embeds = require("../embeds.js");
const config = require('../config.json');

module.exports = {
    name: 'say',
    description: 'Make VukkyBot say things!',
    dcPermissions: ['EMBED_LINKS', 'MANAGE_MESSAGES'],
    execute(message, args) {
    
    //If you want it to check for if you are the owner of the server
    
        //if(message.author.id != message.guild.owner.id) {
        //message.channel.send(embeds.errorEmbed("Sorry, but you're not the owner of this server."))
    //} else {
        //let say = args.slice(0).join(' ')
        //message.delete()
        //message.channel.send(say)
    //}

    //If you want it to check for if you are the owner of the VukkyBot

    if(message.author.id != config.misc.owner) {
        message.channel.send(embeds.errorEmbed("Sorry, but you're not the owner of this VukkyBot."))
    } else {
        let say = args.slice(0).join(' ')
        message.delete()
        message.channel.send(say)
    }
    },
};