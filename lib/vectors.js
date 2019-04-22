
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

module.exports = {
    vector: createVector,
    isVector: isVector,
    resize: resizeVector
};

