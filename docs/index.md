Welcome to the VukkyBot Documentation page!

What do you need?

<details markdown="1">
<summary>Help with customizing my own VukkyBot!</summary>

Please note: you cannot customize the official VukkyBot.

Documentation for customizing your own VukkyBot is over [here](config.html).

</details>

<details markdown="1">
<summary>A VukkyBot!</summary>

Okay, what VukkyBot do you want?

<details markdown="1">
<summary>The official VukkyBot, with no customization</summary>

You can invite it [here](https://discord.com/api/oauth2/authorize?client_id=738380754249318531&permissions=0&scope=bot). However, I'm not responsible if it shuts down or hits the 100 server cap.

</details>

<details markdown="1">
<summary>A VukkyBot that I can host and customize myself</summary>

*Experimental feature. If you find a bug, please [report it!](https://github.com/VukkyLtd/VukkyBot/issues/new/choose)*

What are you going to host it with?

<details markdown="1">
<summary>My own machine</summary>

This assumes you have:
- [node.js](https://nodejs.org) (npm is installed when you install node.js)
- [Git](https://git-scm.com/)

To host a VukkyBot, you run the following commands:
```
git clone --single-branch --branch master https://github.com/Vukky123/VukkyBot.git
cd VukkyBot
npm install
```
Now, start the interactive VukkyBot Setup tool:
```
npm run setup
```
The setup tool provides an option to automatically start VukkyBot after setup. However, if you said no to that, you can run this command to start VukkyBot:
```
npm start
```

### Restarting VukkyBot
```
npm restart
```

### Stopping VukkyBot
```
npm stop
```

</details>
</details>
</details>
