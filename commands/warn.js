const config = require('../config.json');
require('dotenv').config();
var mysql = require('mysql');
const { errorEmbed, successEmbed } = require("../embeds.js");

var con = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASS,
  database: process.env.SQL_DB
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to the database!");
});

module.exports = {
    name: 'warn',
    description: 'Make VukkyBot give people warnings!',
    dcPermissions: ['EMBED_LINKS', 'MANAGE_MESSAGES'],
    args: true,
    usage: "<@user> <reason>",
    execute(message, args) {
        let mentionedUser = message.guild.member(message.mentions.users.first())
        console.log(mentionedUser)
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(errorEmbed("You need the Manage Messages permission to do that!"))
            if (args.slice(1).join(' ').length >= 1) {
            let sql = "INSERT INTO warnings (username, uid, reason) VALUES ('" + mentionedUser.user.username + "', " + mentionedUser.id + ", '" + args.slice(1).join(' ') + "')";
            con.query(sql, function (err, result) {
            if (err)  {
                message.channel.send(errorEmbed("An error has occurred! See logs for more information."));
                throw err;
            } else {
                message.channel.send(successEmbed(`Warning added to ${mentionedUser} for reason ${args.slice(1).join(' ')}!`));
                console.log("1 warning added");
            }
            });
        }
    },
};
