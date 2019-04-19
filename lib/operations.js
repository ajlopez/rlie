const vectors = require('./vectors');

function add(x, y) {
    if (vectors.isVector(x)) {
        const elems = x.elements();
        
        const result = [];
        
        for (let k = 0, l = elems.length; k < l; k++)
            result[k] = add(elems[k], y);
        
        return vectors.vector(result);
    }
    
    if (vectors.isVector(y)) {
        const elems = y.elements();
        
        const result = [];
        
        for (let k = 0, l = elems.length; k < l; k++)
            result[k] = add(x, elems[k]);
        
        return vectors.vector(result);
    }
    
    return x + y;
}

module.exports = {
    add: add
}