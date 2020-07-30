const embeds = require("../embeds.js");
var specialCode;
var specialCodeContents;

function confirmDroppy(message) {
  const prize = message.content.substring(message.content.search(' ') + 1).substring(message.content.substring(message.content.search(' ') + 1).search(' ') + 1);
  if(!specialCodeContents) { var stringy = `make a giveaway drop with the prize ${prize}?`}
  if(specialCodeContents) { var stringy = `make a giveaway drop with the prize ${prize}, containing a code (**${specialCodeContents}**)?`}
  message.channel.send(embeds.inputEmbed(stringy))
  .then(checkmessage => {
    checkmessage.react('👍').then(() => checkmessage.react('👎'));

    const filter = (reaction, user) => {
      return user.id === message.author.id;
    };

    checkmessage.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
      .then(collected => {
        const reaction = collected.first();

        if (reaction.emoji.name === '👍') {
          droppy(message, prize)
        } else {
          message.channel.send(embeds.successEmbed('giveaway drop creation has been cancelled!'));
        }
      })
      .catch(collected => {
        console.log("👨‍💻 Drop creation failed: " + collected.message)
        return message.channel.send('you didn\'t answer in time, or there was an error.');
      });
  })
}
function droppy(message, prize) {
  message.mentions.channels.first().send('Good luck to everyone that attempts!', embeds.GiveawayDrop(prize, message.author, specialCode))
      .then(gmessage => {
          gmessage.react('🎉');
          const filter = (reaction, user) => reaction.emoji.name === '🎉' && user.bot === false;
          console.log(`The ${prize} giveaway drop begins NOW!`)
          try {
              console.log("Waiting for reactions...")
              gmessage.channel.startTyping();
              message.channel.send(embeds.successEmbed(`alright, a giveaway drop for ${prize} has been started now in <#${gmessage.channel.id}>!`))
              gmessage.awaitReactions(filter, { max: 1, time: 600000, errors: ['time'] })
                  .then(collected => {
                      console.log(`Reaction found!`)
                      const reaction = collected.first();
                      const winner = collected.first().users.cache.last();
                      if (reaction.emoji.name === '🎉') {
                          gmessage.channel.stopTyping();
                          console.log(`A winner for ${prize} has been found!`)
                          console.log("---------------------------------------------")
                          gmessage.reactions.removeAll();
                          gmessage.edit(embeds.GiveawayWinner(prize, message.author, `<@!${winner.id}>`));
                          message.channel.send(embeds.infoEmbed(`<@!${winner.id}> got a drop (**${prize}**)`))
                          gmessage.channel.send(`Congratulations to <@!${winner.id}> for getting a giveaway drop! 🥳\nThe prize was ${prize} - better luck next time to everyone else!`);
                          winner.send(`🎉 __**You got a giveaway drop!**__ 🎉\nYour prize is \`${prize}\`.\nContact <@!${message.member.id}> to collect your prize!`);
                          if(specialCode) winner.send(`This drop comes with a special code. That code is **${specialCodeContents}**!\n\nYou may not have to contact <@!${message.member.id}>.`);
                      }
                  }).catch(collected => {
                      gmessage.channel.stopTyping();
                      console.log(`Nobody cared about ${prize}, that's kinda disappointing. :ragi:`)
                      console.log("---------------------------------------------")
                      gmessage.reactions.removeAll();
                      gmessage.edit(embeds.GiveawayInvalid(prize, message.author));
                      gmessage.channel.send(`No one got the ${prize} giveaway drop, so it has automatically expired.\n${prize} can no longer be claimed.`)
              });
          } catch (e) {
            gmessage.channel.stopTyping();
            console.log(e)
          }
      });
}

module.exports = {
	name: 'giveaway-drop',
	description: 'Do some giveaway drops. Now that\'s cool.',
	dcPermissions: ['EMBED_LINKS', 'ADD_REACTIONS', 'MANAGE_MESSAGES'],
  args: true,
  usage: '<#channel> <prize>',
	guildOnly: true,
	execute(message, args) {
    message.channel.send("Welcome to the giveaway drop creator!")
    if (message.member.permissions.has('ADMINISTRATOR') || message.member.roles.has(726555661286244382)) {
        if (message.mentions.channels.size !== 0) {
            if ((message.content.substring(message.content.search(' ') + 1).search(' ') + 1) !== 0) {
                message.channel.send(embeds.inputEmbed('does this drop have a special code?'))
                  .then(checkmessage => {
                    checkmessage.react('👍').then(() => checkmessage.react('👎'));

                    const filter = (reaction, user) => {
                      return user.id === message.author.id;
                    };

                    checkmessage.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                      .then(collected => {
                        const reaction = collected.first();

                        if (reaction.emoji.name === '👍') {
                          specialCode = true;
                          message.channel.send(embeds.inputEmbed('what\'s the code?'));

                          const filter2 = responsy => {
                            return responsy.author.id === message.author.id;
                          };

                          message.channel.awaitMessages(filter2, { max: 1, time: 30000, errors: ['time'] })
                            .then(collected => {
                              specialCodeContents = collected.first().content;
                              message.channel.send(embeds.infoEmbed('the code has been set!'));
                              confirmDroppy(message)
                            })
                            .catch(collected => {
                              console.log("👨‍💻 Drop creation failed: " + collected.message)
                              return message.channel.send('you didn\'t answer in time, or there was an error.');
                            });
                        } else {
                          specialCode = false;
                          message.channel.send(embeds.infoEmbed('skipped code setup.'));
                          confirmDroppy(message)
                        }
                      })
                      .catch(collected => {
                        console.log("👨‍💻 Drop creation failed: " + collected.message)
                        return message.channel.send('you didn\'t answer in time, or there was an error.');
                      });
                  });
            } else {
              message.channel.send(embeds.errorEmbed('A prize is required! (<#channel> <prize>)'));
            }
        } else {
          message.channel.send(embeds.errorEmbed('A channel is required! (<#channel> <prize>)'));
        }
      } else {
        message.channel.send(embeds.errorEmbed('Starting giveaway drops requires the \`ADMINISTRATOR\` permission.'));
      }
    }
};
