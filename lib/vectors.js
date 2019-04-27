
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
    this.get = function (index) { return elements[index - 1]; };
}

function VectorArray(elems, dims) {
    Vector.call(this, elems);
    
    if (Array.isArray(dims))
        dims = new Vector(dims);
    
    const edims = dims.elements();
    const ndims = edims.length;
    
    this.dimensions = function () { return dims; };
    
    this.get = function () {
        let index = 0;
        let mult = 1;
        
        for (let k = 0; k < ndims; k++) {
            index += (arguments[k] - 1) * mult;
            mult *= edims[k];
        }
        
        return this.elements()[index];
    };
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

function resizeElements(elems, newsize) {
    const newelems = [];
    
    for (let k = 0, l = elems.length; k < newsize; k++)
        if (l === 0)
            newelems[k] = 0;
        else
            newelems[k] = elems[k % l];
    
    return newelems;
}

function resizeVector(vector, newsize) {
    const elems = vector.elements();
    
    return new Vector(resizeElements(elems, newsize));
}

function createArray(elems, dims) {
    let edims;
    
    if (dims instanceof Vector)
        edims = dims.elements();
    else
        edims = dims;
    
    let prod = 1;
    
    for (let k = 0, l = edims.length; k < l; k++)
        prod *= edims[k];
    
    if (prod !== elems.length)
        elems = resizeElements(elems, prod);
    
    return new VectorArray(elems, dims);
}

module.exports = {
    vector: createVector,
    isVector: isVector,
    resize: resizeVector,
    
    array: createArray
};

