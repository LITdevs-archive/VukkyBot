# How to contribute to VukkyBot

Before you start, make sure you use [Visual Studio Code](https://code.visualstudio.com/) and you have all the recommended extensions installed.

Install all the required dependencies before testing. Make sure that your dependencies are updated before testing too.
```
npm install
```

## Commands

Commands are stored in the "commands" folder.

### Exports
`name` and `description` are required metadata.

`dcPermissions` is an array with all the Discord permissions the bot needs to run the command.

`args` is a boolean, which if set to true means that the command requires arguments.

`guildOnly` is a boolean, which if set to true means that the command can only be ran in guilds.

`cooldown` is an integer, which is the cooldown for the command in seconds.

`mysql` is a boolean, which if set to true means that the command requires MySQL to be enabled in the VukkyBot settings.

`execute` is a function, which has the code executed in the command.

### Adding new commands

Let's make a new command called `vukkylove`, which will respond with an embed saying "Vukky loves you!".

This command will require the `EMBED_LINKS` permission. As an example, we'll use the `ping` command.

Make a new file in the "commands" folder called `vukkylove.js`, with the following contents:
```js
const { infoEmbed } = require("../embeds.js");

module.exports = {
	name: "ping",
	description: "Ping!",
	dcPermissions: ["EMBED_LINKS"],
	execute(message, args) {
		message.channel.send(infoEmbed("Pong."));
	},
};
```

Now, we'll update the command metadata.
```diff
-	name: "ping",
-	description: "Ping!",
+	name: "vukkylove",
+	description: "Get a lovely message from Vukky!",
```

Finally, let's update the command itself. Code executed in the command is stored in the execute function.
```diff
- 		message.channel.send(infoEmbed("Pong."));
+		message.channel.send(infoEmbed("Vukky loves you!"));
```

Congratulations! You now made a new VukkyBot command.

It should look like this:

![Example of the command in Discord](https://i.imgur.com/YY90wa2.png)

```js
const { infoEmbed } = require("../embeds.js");

module.exports = {
	name: "vukkylove",
	description: "Get a lovely message from Vukky!",
	dcPermissions: ["EMBED_LINKS"],
	execute(message, args) {
		message.channel.send(infoEmbed("Vukky loves you!"));
	},
};
```

### Editing existing commands

Editing existing commands is quite simple. Let's say we wanted to update the `ping` command:

```js
const { infoEmbed } = require("../embeds.js");

module.exports = {
	name: "ping",
	description: "Ping!",
	dcPermissions: ["EMBED_LINKS"],
	execute(message, args) {
		message.channel.send(infoEmbed("Pong."));
	},
};
```

Code executed in the command is stored in the execute function, so let's make it say `Hello! I saw your message.`:

```diff
-		message.channel.send(infoEmbed("Pong."));
+		message.channel.send(infoEmbed("Hello! I saw your message."));
```

Congratulations! You now edited an existing VukkyBot command.

It should look like this:

![Example of the command in Discord](https://i.imgur.com/oMDmv9h.png)

```js
const { infoEmbed } = require("../embeds.js");

module.exports = {
	name: "ping",
	description: "Ping!",
	dcPermissions: ["EMBED_LINKS"],
	execute(message, args) {
		message.channel.send(infoEmbed("Hello! I saw your message."));
	},
};
```