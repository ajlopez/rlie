
function Vector(elems) {
    let elements = [];
    
    for (let k = 0, l = elems.length; k < l; k++) {
        const elem = elems[k];
        
        if (typeof elem.elements === 'function')
            elements = elements.concat(elem.elements());
        else
            elements.push(elem);
    }
        
    this.elements = function () { return elements; };
    this.length = function () { return elements.length; };
    
    // TODO index === 0
    this.get = function (index) { 
        if (index > 0)
            return elements[index - 1]; 
        
        if (index < 0) {
            const elems = [];
            
            for (let k = 0, l = elements.length; k < l; k++)
                if (-index !== k + 1)
                    elems.push(elements[k]);
                
            return createVector(elems);
        }
    };
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

function isArray(value) {
    return value instanceof VectorArray;
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
    if (elems instanceof Vector)
        elems = elems.elements();
    
    if (dims instanceof Vector)
        dims = dims.elements();
    
    let prod = 1;
    
    for (let k = 0, l = dims.length; k < l; k++)
        prod *= dims[k];
    
    if (prod !== elems.length)
        elems = resizeElements(elems, prod);
    
    return new VectorArray(elems, dims);
}

module.exports = {
    vector: createVector,
    isVector: isVector,
    resize: resizeVector,
    
    array: createArray,
    isArray: isArray
};

