
function Vector(elems) {
    let elements = [];
    
    for (let k = 0, l = elems.length; k < l; k++) {
        const elem = elems[k];
        
        if (elem instanceof Vector)
            elements = elements.concat(elem.elements());
        else
            elements.push(elem);
    }
        
    this.elements = function () { return elements; };
    this.length = function () { return elements.length; };
}

function createVector(elems) {
    return new Vector(elems);
}

function isVector(value) {
    return value instanceof Vector;
}

module.exports = {
    vector: createVector,
    isVector: isVector
};