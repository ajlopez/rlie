const vectors = require('./vectors');

function applyVector0(fn, x) {
    const elems = x.elements();
    let result = elems[0];
    
    for (let k = 1, l = elems.length; k < l; k++)
        result = fn(result, elems[k]);
    
    return result;
}

function applyVector(fn, x) {
    const elems = x.elements();
    const result = [];
    
    for (let k = 0, l = elems.length; k < l; k++)
        result[k] = fn(elems[k]);
    
    return vectors.vector(result);
}

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

function apply10(fn, x, defvalue) {
    const vx = vectors.isVector(x);
    
    if (vx) {
        const result = applyVector0(fn, x);
        
        if (result == null && defvalue != null)
            return defvalue;
        
        return result;
    }
    
    if (fn.length === 2 && defvalue != null)
        return fn(defvalue, x);
    
    return fn(x);
}

function apply1(fn, x) {
    const vx = vectors.isVector(x);
    
    if (vx)
        return applyVector(fn, x);
    
    return fn(x);
}

function apply2(fn, x, y) {
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

function mean(x) {
    return module.exports.divide(module.exports.sum(x), module.exports.length(x));
}

function varfn(x) {
    return module.exports.divide(module.exports.sum(module.exports.power(module.exports.subtract(x, mean(x)), 2)), module.exports.subtract(module.exports.length(x), 1));
}

// TODO apply to null
function asCharacter(x) {
    if (typeof x === 'string')
        return x;
    
    if (typeof x === 'boolean')
        return x.toString().toUpperCase();
    
    return x.toString();
}

// TODO apply to "foo" then NA
// TODO apply to null
function asInteger(x) {
    if (typeof x === 'boolean')
        return x ? 1 : 0;
    
    return parseInt(x);
}

// TODO apply to "foo" then NA
// TODO apply to null
function asNumeric(x) {
    if (typeof x === 'boolean')
        return x ? 1 : 0;
    
    return parseFloat(x);
}

// TODO apply to "foo" then NA
// TODO apply to "1" then NA
// TODO apply to null
function asLogical(x) {
    if (asNumeric(x))
        return true;
    else
        return false;
}

module.exports = {
    add: function (x, y) { return apply2((x, y) => x + y, x, y); },
    subtract: function (x, y) { return apply2((x, y) => x - y, x, y); },
    multiply: function (x, y) { return apply2((x, y) => x * y, x, y); },
    divide: function (x, y) { return apply2((x, y) => x / y, x, y); },
    integerDivide: function (x, y) { return apply2((x, y) => Math.floor(x / y), x, y); },
    mod: function (x, y) { return apply2((x, y) => x % y, x, y); },
    power: function (x, y) { return apply2((x, y) => x ** y, x, y); },

    and: function (x, y) { return apply2((x, y) => x && y ? true: false, x, y); },
    or: function (x, y) { return apply2((x, y) => x || y ? true: false, x, y); },
    
    less: function (x, y) { return apply2((x, y) => x < y, x, y); },
    lessEqual: function (x, y) { return apply2((x, y) => x <= y, x, y); },
    greater: function (x, y) { return apply2((x, y) => x > y, x, y); },
    greaterEqual: function (x, y) { return apply2((x, y) => x >= y, x, y); },
    equal: function (x, y) { return apply2((x, y) => x === y, x, y); },
    notEqual: function (x, y) { return apply2((x, y) => x !== y, x, y); },

    not: function (x) { return apply1(x => !x, x); },
    minus: function (x) { return apply1(x => -x, x); },

    min: function (x) { return apply10(Math.min, x, Infinity); },
    max: function (x) { return apply10(Math.max, x, -Infinity); },
    sum: function (x) { return apply10((x, y) => x + y, x, 0); },
    prod: function (x) { return apply10((x, y) => x * y, x, 1); },

    length: function (x) { if (x && typeof x.length === 'function') return x.length(); return 1; },
    mean: mean,
    var: varfn,
    
    sin: function (x) { return apply1(Math.sin, x); },
    cos: function (x) { return apply1(Math.cos, x); },
    tan: function (x) { return apply1(Math.tan, x); },
    acos: function (x) { return apply1(Math.acos, x); },
    asin: function (x) { return apply1(Math.asin, x); },
    atan: function (x) { return apply1(Math.atan, x); },
    atan2: function (x, y) { return apply2(Math.atan2, x, y); },
    
    abs: function (x) { return apply1(Math.abs, x); },
    exp: function (x) { return apply1(Math.exp, x); },
    log: function (x) { return apply1(Math.log, x); },
    sqrt: function (x) { return apply1(Math.sqrt, x); },
    
    asLogical: function (x) { return apply1(asLogical, x); },
    asInteger: function (x) { return apply1(asInteger, x); },
    asNumeric: function (x) { return apply1(asNumeric, x); },
    asCharacter: function (x) { return apply1(asCharacter, x); },
    
    dim: function (x) { 
        if (x && typeof x.dimensions === 'function')
            return x.dimensions();
        
        return null;
    },
    nrow: function (x) { 
        if (x && typeof x.dimensions === 'function')
            return x.dimensions().elements()[0];
        
        return null;
    },
    ncol: function (x) { 
        if (x && typeof x.dimensions === 'function')
            return x.dimensions().elements()[1];
        
        return null;
    }
}

