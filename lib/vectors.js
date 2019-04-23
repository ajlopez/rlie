
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

function VectorArray(elems, dims) {
    Vector.call(this, elems);
    
    if (Array.isArray(dims))
        dims = new Vector(dims);
    
    this.dimensions = function () { return dims; };
}

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance

VectorArray.prototype = Object.create(Vector.prototype);
VectorArray.prototype.constructor = VectorArray;

function createVector(elems) {
    return new Vector(elems);
}

function isVector(value) {
    return value instanceof Vector;
}

function resizeVector(vector, newsize) {
    const elems = vector.elements();
    const newelems = [];
    
    for (let k = 0, l = elems.length; k < newsize; k++)
        if (l === 0)
            newelems[k] = 0;
        else
            newelems[k] = elems[k % l];
    
    return new Vector(newelems);
}

function createArray(elems, dims) {
    return new VectorArray(elems, dims);
}

module.exports = {
    vector: createVector,
    isVector: isVector,
    resize: resizeVector,
    
    array: createArray
};

