const embeds = require("../utilities/embeds");

module.exports = {
	name: "reload",
	description: "Reloads a command",
	args: true,
	usage: "<command>",
	botPermissions: ["EMBED_LINKS"],
	execute(message, args) {
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
		|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) return message.channel.send(embeds.errorEmbed(`There is no command with name or alias \`${commandName}\`, ${message.author}!`));

		delete require.cache[require.resolve(`./${command.name}.js`)];

		try {
			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
		} catch (error) {
			console.log(error);
			const vukkytils = require("../utilities/vukkytils");
			const format = require("util").format;
			message.channel.send(embeds.errorEmbed(format(vukkytils.getString("ERROR_RELOAD"), commandName, error.message)));
		}

		message.channel.send(embeds.successEmbed(`\`${command.name}\` has been reloaded!`));
	},
};
