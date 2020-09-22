Welcome to the VukkyBot Documentation page!

What do you need?

<details>
<summary>Help with customizing my own VukkyBot!</summary>

Please note: you cannot customize the official VukkyBot.

Documentation for customizing your own VukkyBot is over [here](config.json).
</details>

<details>
<summary>A VukkyBot!</summary>

*Experimental feature. If you find a bug, please [report it!](https://github.com/Vukky123/VukkyBot/issues/new/choose)*

Okay, what VukkyBot do you want?
<details>
<summary>The official VukkyBot</summary>

You can invite it [here](https://discord.com/api/oauth2/authorize?client_id=738380754249318531&permissions=0&scope=bot). However, I'm not responsible if it shuts down or hits the 100 server cap.
</details>
<details>
<summary>A VukkyBot that I can host and customize myself</summary>
What are you going to host it with?
<details>
<summary>Heroku</summary>

*Your deployed VukkyBot will run 24/7. This will use up your free dyno hours before the end of the month. Link a credit card if you want to run your VukkyBot for the entire month.*

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

*If the above button doesn't work, try [this link](https://dashboard.heroku.com/new?button-url=https%3A%2F%2Fgithub.com%2FVukky123%2FVukkyBot&template=https%3A%2F%2Fgithub.com%2FVukky123%2FVukkyBot%2Fapp.json).*

When your VukkyBot has been deployed, check its Resources tab.

Disable the *web* process and enable the *service* process to start up your VukkyBot.

![GIF showing how to disable the web process and enable the service process.](https://i.imgur.com/Bh39dW4.gif)
</details>

<details>
<summary>My own machine</summary>

This assumes you have:
- node.js (comes with npm)
- Git

To host a VukkyBot, you run the following commands:
```
git clone https://github.com/Vukky123/VukkyBot.git
cd VukkyBot
npm install
```
But don't close your window just yet!
Before we start VukkyBot, you need to make an .env file:
```
BOT_TOKEN=BOTTOKENHERE
PREFIX=BOTPREFIXHERE
```
Now, run the following command:
```
npm start
```
Your VukkyBot should now start.
</details>
</details>
</details>
