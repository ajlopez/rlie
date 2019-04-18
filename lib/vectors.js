
function Vector(elems) {
    this.elements = function () { return elems; };
}

function createVector(elems) {
    return new Vector(elems);
}

module.exports = {
    vector: createVector
};