
function Range(from, to) {
    this.next = function () {
        if (from > to)
            return null;
        
        return from++;
    }
}

function createRange(from, to) {
    return new Range(from, to);
}

module.exports = {
    range: createRange
};