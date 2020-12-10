const vukkytils = require("vukkyutils");
const config = require("../config.json");

vukkytils.setLanguage(config.misc.language);
vukkytils.loadStrings("../strings.json");

module.exports = vukkytils;
