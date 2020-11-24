const strings = require("./strings.json");
const config = require("./config.json");

module.exports = {
	getString
};

/**
 * Gets a string from strings.json in the user's language. Falls back to English if there's no string for the user's language.
 * @param {string} string - The string to get
 */
function getString(string) {
	let localString = strings[config.misc.language][string];
	if(localString) {
		return localString;
	} else {
		return strings["en"][string];
	}
}
