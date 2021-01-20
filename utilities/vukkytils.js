const vukkytils = require("vukkyutils");
const config = require("../config.json");

vukkytils.setLanguage(config.misc.language);
vukkytils.setSplitLanguagesMode(true);
vukkytils.setSplitLanguagesLocation("../strings");

module.exports = vukkytils;
