const modifier = 2.857142;
module.exports = {
	convert: function(original) {
		let string = original.toString();
		return Math.floor((parseInt(string.slice(-2)) + 1) / modifier);
	}
};