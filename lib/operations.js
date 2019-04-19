const vectors = require('./vectors');

function applyNumberVector(fn, x, y) {
    const elems = y.elements();
    const result = [];
    
    for (let k = 0, l = elems.length; k < l; k++)
        result[k] = fn(x, elems[k]);
    
    return vectors.vector(result);
}

function applyVectorElement(fn, x, y) {
    const elems = x.elements();
    const result = [];
    
    for (let k = 0, l = elems.length; k < l; k++)
        result[k] = fn(elems[k], y);
    
    return vectors.vector(result);
}

function applyVectorVector(fn, x, y) {
    const xelems = x.elements();
    const yelems = y.elements();
    const xl = xelems.length;
    const yl = yelems.length;
    const l = Math.max(xl, yl);
    
    const result = [];
    
    for (let k = 0; k < l; k++)
        result[k] = fn(xelems[k % xl], yelems[k % yl]);
    
    return vectors.vector(result);
}

function apply(fn, x, y) {
    const vx = vectors.isVector(x);
    const vy = vectors.isVector(y);
    
    if (vx && vy)
        return applyVectorVector(fn, x, y);
    
    if (vx)
        return applyVectorElement(fn, x, y);
    
    if (vy)
        return applyNumberVector(fn, x, y);
    
    return fn(x, y);
}

module.exports = {
    add: function (x, y) { return apply((x, y) => x + y, x, y); }
}