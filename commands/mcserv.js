// Copyright (C) 2021 Vukky

const vukkytils = require("../utilities/vukkytils");
const config = require("../config.json");

module.exports = {
	name: "mcserv",
	description: "Get details on a Minecraft Java server. This assumes the port is 25565.",
	botPermissions: ["EMBED_LINKS"],
	args: true,
	usage: "<server IP>",
	async execute(message, args) {
		message.channel.send(`${config.misc.emoji.loading} ${vukkytils.getString("GETTING_DATA")}`)
			.then(newMessage => {
				const util = require("minecraft-server-util");

				util.status(args.slice(0).join(" "))
					.then((response) => {
						newMessage.edit(`**${response.host}** - ${response.version}\n**${response.onlinePlayers}/${response.maxPlayers}** online players`);
					})
					.catch((error) => {
						newMessage.edit(`${config.misc.emoji.error} ${error.message}`);
					});
			});
	},
};
