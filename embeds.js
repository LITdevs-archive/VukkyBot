const Discord = require('discord.js');
const pjson = require('./package.json')
const config = require('./config.json');
const avatarURL = 'https://i.imgur.com/H0sAkrl.png'
const versionString = `This VukkyBot is using v${pjson.version} with discord.js ${pjson.dependencies['discord.js'].substring(1)}`

module.exports = {
    errorEmbed,
    warningEmbed,
    infoEmbed,
    successEmbed,
    GiveawayDrop,
    GiveawayWinner,
    GiveawayInvalid,
    inputEmbed,
    quizStartEmbed,
    quizWinnerEmbed,
    quizLoseEmbed,
    cooldownEmbed,
    cryptoEmbed
};

function errorEmbed(errorMsg) {
  return new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setTitle('❌ There was an error.')
    .setDescription(errorMsg)
    .setTimestamp()
    .setFooter(versionString, avatarURL);
}

function warningEmbed(warningMsg) {
  return new Discord.MessageEmbed()
    .setColor('#ffc83d')
    .setTitle('⚠ Warning:')
    .setDescription(warningMsg)
    .setTimestamp()
    .setFooter(versionString, avatarURL);
}

function infoEmbed(informationMsg) {
  return new Discord.MessageEmbed()
    .setColor('#4b83c3')
    .setTitle('ℹ Information')
    .setDescription(informationMsg)
    .setTimestamp()
    .setFooter(versionString, avatarURL);
}

function successEmbed(successMsg) {
  return new Discord.MessageEmbed()
    .setColor('#16c60c')
    .setTitle('✅ Success!')
    .setDescription(successMsg)
    .setTimestamp()
    .setFooter(versionString, avatarURL);
}

function inputEmbed(detailsMsg) {
  return new Discord.MessageEmbed()
    .setColor('#99aab5')
    .setTitle('⌨ Input requested!')
    .setDescription(detailsMsg)
    .setTimestamp()
    .setFooter(versionString, avatarURL);
}

function GiveawayDrop(prize, dropped_by, code) {
    if(code == true) {
      var howToString = 'Be the first who reacts with :tada: to this message. More details in <#726070905750421545>\n\n**THIS GIVEAWAY DROP CONTAINS A SPECIAL CODE!**\nMake sure your DMs are open!!'
      var titleString = '🎁⌨ Giveaway Drop (with special code)'
    } else {
      var howToString = 'Be the first who reacts with :tada: to this message. More details in <#726070905750421545>'
      var titleString = '🎁 Giveaway Drop'
    }
    return new Discord.MessageEmbed()
        .setColor("#D0A33E")
        .setTitle(titleString)
        .addField("Prize", prize, false)
        .addField("Winner", 'No winner yet!', false)
        .addField("How do I win?", howToString, false)
        .setAuthor(`Started by ${dropped_by.tag}`)
        .setTimestamp()
        .setFooter(versionString, avatarURL);
}

function GiveawayWinner(prize, dropped_by, winner) {
    return new Discord.MessageEmbed()
        .setColor("#D000BC")
        .setTitle('👑 Giveaway Drop winner!')
        .addField("Prize", prize, false)
        .addField("Winner", winner, false)
        .setAuthor(`Started by ${dropped_by.tag}`)
        .setTimestamp()
        .setFooter(versionString, avatarURL);
}

function GiveawayInvalid(prize, dropped_by) {
    return new Discord.MessageEmbed()
        .setColor("#8EA5D0")
        .setTitle('💸 Giveaway Drop expired...')
        .addField("Prize", prize, false)
        .addField("Winner", 'This prize is unfortunately no longer valid. Maybe next time?', false)
        .setAuthor(`Started by ${dropped_by.tag}`)
        .setTimestamp()
        .setFooter(versionString, avatarURL);
}

function quizStartEmbed(question, time, hint, author, categories) {
  var description = `**Categories:** ${categories.join(", ")}\n\n${question}\nYou have ${time} seconds to answer!\n`
  if(!author) {
    author = 'someone! ¯\\_(ツ)\_/¯'
  }
  if(hint && config.commands.quiz.hints == true) {
    description = description.concat(`\n💡 **Hint available.** ||${hint}||`)
  }
  description = description.concat(`\n📝 This question was brought to you by ${author}!`)
  return new Discord.MessageEmbed()
    .setColor('#7289da')
    .setTitle('❓ Are you ready? Here we go!')
    .setDescription(description)
    .setTimestamp()
    .setFooter(versionString, avatarURL);
}

function quizWinnerEmbed(winner) {
  return new Discord.MessageEmbed()
    .setColor('#ffc83d')
    .setTitle('👑 Ding ding ding!')
    .setDescription(`${winner.author} got the correct answer!`)
    .setTimestamp()
    .setFooter(versionString, avatarURL);
}

function quizLoseEmbed(message) {
  return new Discord.MessageEmbed()
    .setColor('#be1931')
    .setTitle('😅 Game over! No one wins.')
    .setDescription(message)
    .setTimestamp()
    .setFooter(versionString, avatarURL);
}

function cooldownEmbed(message) {
  return new Discord.MessageEmbed()
    .setColor('#ffffff')
    .setTitle('⏲ Slow down!')
    .setDescription(message)
    .setTimestamp()
    .setFooter(versionString, avatarURL);
}

function cryptoEmbed(coin, value, lastupdated) {
  return new Discord.MessageEmbed()
    .setColor('#a7d28b')
    .setTitle(`💰 ${coin} value`)
    .setDescription(`Here's your requested data!`)
    .addField("Value in USD", `$${value}`, true)
    .addField("Last updated", lastupdated, true)
    .addField("Coin", coin, true)
    .setTimestamp()
    .setFooter(versionString, avatarURL);
}
