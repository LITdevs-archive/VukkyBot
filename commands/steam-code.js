const embeds = require("../embeds.js");

module.exports = {
	name: 'steam-code',
	description: 'Generate a fake Steam code!',
	dcPermissions: ['EMBED_LINKS'],
	execute(message, args) {
        function makeid(length) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
               result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
         }
		message.channel.send(`${makeid(5)}-${makeid(5)}-${makeid(5)}`)
	},
};
