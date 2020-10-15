var mysql = require("mysql")
require('dotenv').config();
let sql
module.exports = {
    start: function() {

        let con = mysql.createConnection({
            host: process.env.SQL_HOST,
            user: process.env.SQL_USER,
            password: process.env.SQL_PASS,
            database: process.env.SQL_DB
        });

        con.connect(function(err) {
            if (err) {
                console.log("[counting] Failed to connect to the database")
                console.log(err)
            } else {
                console.log("[counting] Connected to the database")
                sql = "CREATE TABLE counting (serverid VARCHAR(255), number VARCHAR(255), lastcounter VARCHAR(255), id INT AUTO_INCREMENT PRIMARY KEY)";
                con.query(sql, function (err, result) {
                if (err) {
                    console.log("[counting] Table creation failed (Probably already exists)")
                    con.end()
                } else {
                    console.log("[counting] Table created")
                    con.end()
                }
                });
            }
        });

    },
    countCheck: function (message) {
    

        let con = mysql.createConnection({
            host: process.env.SQL_HOST,
            user: process.env.SQL_USER,
            password: process.env.SQL_PASS,
            database: process.env.SQL_DB
        });

       sql = "SELECT * FROM counting WHERE serverid = " + message.guild.id;
       con.query(sql, function (err, result) {
        if (err) {
            console.log("[counting] something went wrong fetching current number. Maybe it doesnt exist?")
            con.end()
        } else {
            let currentNumber
            let lastCounter
            if (result.length <= 0) {
                console.log("[counting] Creating row for server...")
                let con = mysql.createConnection({
                    host: process.env.SQL_HOST,
                    user: process.env.SQL_USER,
                    password: process.env.SQL_PASS,
                    database: process.env.SQL_DB
                });

                con.connect(function(err) {
                    if (err) {
                        console.log("[counting] Failed to connect to the database")
                        console.log(err)
                    } else {
                        sql = `INSERT INTO counting(serverid, number) VALUES (${message.guild.id}, 0)`;
                        con.query(sql, function (err, result) {
                        if (err) {
                            console.log("[counting] Failed to create row")
                            con.end()
                        } else {
                            con.end()
                        }
                        });
                    }
                });
                currentNumber = 0
                lastCounter = 0
            } else {
            currentNumber = result[0].number;
            lastCounter = result[0].lastcounter;
            }
            con.end()
            if (message.content && !isNaN(message.content.split(' ')[0])) {
                if (parseInt(message.content.split(' ')[0]) == parseInt(currentNumber) + 1) {
                    if (lastCounter != message.author.id) {
                        currentNumber++
                        let con = mysql.createConnection({
                            host: process.env.SQL_HOST,
                            user: process.env.SQL_USER,
                            password: process.env.SQL_PASS,
                            database: process.env.SQL_DB
                        });
                        sql = `UPDATE counting set number = ${message.content.split(' ')[0]}, lastcounter = ${message.author.id} WHERE serverid = ${message.guild.id}`
                        con.connect(function(err) {
                            if (err) {
                                console.log("[counting] Something went wrong")
                                console.log(err)
                            } else {
                                con.query(sql, function (err, result) {
                                if (err) {
                                    console.log("[counting] something went wrong")
                                    con.end()
                                } else {
                                    con.end()
                                }
                                });
                            }
                        });
                        message.react("✅")
                    } else {
                        message.channel.send(`<@${message.author.id}> screwed up! You can't count twice in a row!\nThe next number is **1**.`)
                        let con = mysql.createConnection({
                            host: process.env.SQL_HOST,
                            user: process.env.SQL_USER,
                            password: process.env.SQL_PASS,
                            database: process.env.SQL_DB
                        });
                        sql = `UPDATE counting set number = 0, lastcounter = 0 WHERE serverid = ${message.guild.id}`
                        con.connect(function(err) {
                            if (err) {
                                console.log("[counting] Something went wrong")
                                console.log(err)
                            } else {
                                con.query(sql, function (err, result) {
                                if (err) {
                                    console.log("[counting] something went wrong")
                                    con.end()
                                } else {
                                    con.end()
                                }
                                });
                            }
                        });
                        message.react("❌")
                    }
                } else {
                    message.channel.send(`<@${message.author.id}> screwed up! The correct number would have been **${parseInt(currentNumber) + 1}**.\nThe next number is **1**.`)
                    let con = mysql.createConnection({
                        host: process.env.SQL_HOST,
                        user: process.env.SQL_USER,
                        password: process.env.SQL_PASS,
                        database: process.env.SQL_DB
                    });
                    sql = `UPDATE counting set number = 0, lastcounter = 0 WHERE serverid = ${message.guild.id}`
                    con.connect(function(err) {
                        if (err) {
                            console.log("[counting] Something went wrong")
                            console.log(err)
                        } else {
                            con.query(sql, function (err, result) {
                            if (err) {
                                console.log("[counting] something went wrong")
                                con.end()
                            } else {
                                con.end()
                            }
                            });
                        }
                    });
                
            }
            }
        }
        });

    }
  };