# VukkyBot
A bot made for **Vukky's Chat Place**

## Help VukkyBot
[Submit feature requests or bug reports](https://github.com/Vukky123/VukkyBot/issues/new/choose)

## Get your own VukkyBot
*Experimental feature. If you find a bug, please [report it!](https://github.com/Vukky123/VukkyBot/issues/new/choose)*

### Deploy VukkyBot to Heroku

*Your deployed VukkyBot will run 24/7. This will use up your free dyno hours before the end of the month. Link a credit card if you want to run your VukkyBot for the entire month.*

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

*If the above button doesn't work, try [this link](https://dashboard.heroku.com/new?button-url=https%3A%2F%2Fgithub.com%2FVukky123%2FVukkyBot&template=https%3A%2F%2Fgithub.com%2FVukky123%2FVukkyBot%2Fapp.json).*

When your VukkyBot has been deployed, check its Resources tab.

Disable the *web* process and enable the *service* process to start up your VukkyBot.

![GIF showing how to disable the web process and enable the service process.](https://i.imgur.com/Bh39dW4.gif)

### Host a VukkyBot

This assumes you have:
- node.js (comes with npm)
- Git

To host a VukkyBot, you run the following command:
```
git clone https://github.com/Vukky123/VukkyBot.git
```
Don't close your window yet!
In your new clone, you will need an .env file containing the following:
```
BOT_TOKEN=BOTTOKENHERE
PREFIX=BOTPREFIXHERE
```
Now, run the following commands:
```
cd VukkyBot
npm start
```
Your VukkyBot should now start.
