const modifier = 2.63157895;
module.exports = {
    convert: function(original) {
        let string = original.toString()
        return Math.floor(parseInt(string.slice(-2)) / modifier);
    }
}