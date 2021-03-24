// Copyright (C) 2020 vtheskeleton

const modifier = 2.857142;
module.exports = {
	/**
	 * Convert any number to a Vukky number.
	 * @param {number} original The number to be converted.
	 */
	convert: function(original) {
		let string = original.toString();
		return Math.floor((parseInt(string.slice(-2)) + 1) / modifier);
	}
};