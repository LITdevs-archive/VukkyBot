const Discord = require('discord.js');
const pjson = require('./package.json')
const avatarURL = 'https://i.imgur.com/oFvEuwb.jpg'
const versionString = `Running version ${pjson.version} using discord.js ${pjson.dependencies['discord.js'].substring(1)}`

module.exports = {
    errorEmbed,
    warningEmbed,
    infoEmbed,
    successEmbed,
    GiveawayDrop,
    GiveawayWinner,
    GiveawayInvalid,
    inputEmbed
};

function errorEmbed(errorMsg) {
  return new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setTitle('❌ ERROR!')
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
