
const operations = require('../lib/operations');
const vectors = require('../lib/vectors');

function apply1(test, opname, x, expected) {
    if (Array.isArray(x))
        x = vectors.vector(x);
    
    const result = operations[opname](x);
    
    if (vectors.isVector(result))
        test.deepEqual(result.elements(), expected);
    else {
        if (isNaN(result) && isNaN(expected))
            return;
        
        test.equal(result, expected);
    }
}

function apply2(test, opname, x, y, expected) {
    if (Array.isArray(x))
        x = vectors.vector(x);
    
    if (Array.isArray(y))
        y = vectors.vector(y);
    
    const result = operations[opname](x, y);
    
    if (vectors.isVector(result))
        test.deepEqual(result.elements(), expected);
    else
        test.equal(result, expected);
}

function min(test, x, expected) {
    apply1(test, 'min', x, expected);
}

function max(test, x, expected) {
    apply1(test, 'max', x, expected);
}

function sum(test, x, expected) {
    apply1(test, 'sum', x, expected);
}

function not(test, x, expected) {
    apply1(test, 'not', x, expected);
}

function prod(test, x, expected) {
    apply1(test, 'prod', x, expected);
}

function length(test, x, expected) {
    apply1(test, 'length', x, expected);
}

function mean(test, x, expected) {
    apply1(test, 'mean', x, expected);
}

function varfn(test, x, expected) {
    apply1(test, 'var', x, expected);
}

function add(test, x, y, expected) {
    apply2(test, 'add', x, y, expected);
}

function subtract(test, x, y, expected) {
    apply2(test, 'subtract', x, y, expected);
}

function multiply(test, x, y, expected) {
    apply2(test, 'multiply', x, y, expected);
}

function divide(test, x, y, expected) {
    apply2(test, 'divide', x, y, expected);
}

function power(test, x, y, expected) {
    apply2(test, 'power', x, y, expected);
}

exports['add numbers'] = function (test) {
    add(test, 1, 2, 3);
    add(test, Math.PI, Math.E, Math.PI + Math.E);
    add(test, -1, 1, 0);
};

exports['add number and vector'] = function (test) {
    add(test, 1, [ 1, 2, 3 ], [ 2, 3, 4 ]);
    add(test, Math.PI, [ Math.E, Math.E ], [ Math.PI + Math.E, Math.PI + Math.E ]);
    add(test, -1, [ 1, 1, 1 ], [ 0, 0, 0 ]);
};

exports['add vector and number'] = function (test) {
    add(test, [ 1, 2, 3 ], 1, [ 2, 3, 4 ]);
    add(test, [ Math.E, Math.E ], Math.PI, [ Math.PI + Math.E, Math.PI + Math.E ]);
    add(test, [ 1, 1, 1 ], -1, [ 0, 0, 0 ]);
};

exports['add vector and vector'] = function (test) {
    add(test, [ 1, 2, 3 ], [ 1, 2, 3 ], [ 2, 4, 6 ]);
    add(test, [ Math.E, Math.E ], [ 1, Math.PI ], [ Math.E + 1, Math.PI + Math.E ]);
    add(test, [ 1, 1, 1 ], [ -1, 1 ], [ 0, 2, 0 ]);
    add(test, [ -1, 1 ], [ 1, 1, 1 ], [ 0, 2, 0 ]);
};

exports['subtract numbers'] = function (test) {
    subtract(test, 1, 2, -1);
    subtract(test, Math.PI, Math.E, Math.PI - Math.E);
    subtract(test, -1, 1, -2);
};

exports['subtract number and vector'] = function (test) {
    subtract(test, 1, [ 1, 2, 3 ], [ 0, -1, -2 ]);
    subtract(test, Math.PI, [ Math.E, Math.E ], [ Math.PI - Math.E, Math.PI - Math.E ]);
    subtract(test, -1, [ 1, 1, 1 ], [ -2, -2, -2 ]);
};

exports['subtract vector and number'] = function (test) {
    subtract(test, [ 1, 2, 3 ], 1, [ 0, 1, 2 ]);
    subtract(test, [ Math.E, Math.E ], Math.PI, [ Math.E - Math.PI, Math.E - Math.PI ]);
    subtract(test, [ 1, 1, 1 ], -1, [ 2, 2, 2 ]);
};

exports['subtract vector and vector'] = function (test) {
    subtract(test, [ 1, 2, 3 ], [ 1, 2, 3 ], [ 0, 0, 0 ]);
    subtract(test, [ Math.E, Math.E ], [ 1, Math.PI ], [ Math.E - 1, Math.E - Math.PI ]);
    subtract(test, [ 1, 1, 1 ], [ -1, 1 ], [ 2, 0, 2 ]);
    subtract(test, [ -1, 1 ], [ 1, 1, 1 ], [ -2, 0, -2 ]);
};

exports['multiply numbers'] = function (test) {
    multiply(test, 1, 2, 2);
    multiply(test, Math.PI, Math.E, Math.PI * Math.E);
    multiply(test, -1, 1, -1);
};

exports['multiply number and vector'] = function (test) {
    multiply(test, 1, [ 1, 2, 3 ], [ 1, 2, 3 ]);
    multiply(test, Math.PI, [ Math.E, Math.E ], [ Math.PI * Math.E, Math.PI * Math.E ]);
    multiply(test, -1, [ 1, 1, 1 ], [ -1, -1, -1 ]);
};

exports['multiply vector and number'] = function (test) {
    multiply(test, [ 1, 2, 3 ], 1, [ 1, 2, 3 ]);
    multiply(test, [ Math.E, Math.E ], Math.PI, [ Math.E * Math.PI, Math.E * Math.PI ]);
    multiply(test, [ 1, 1, 1 ], -1, [ -1, -1, -1 ]);
};

exports['multiply vector and vector'] = function (test) {
    multiply(test, [ 1, 2, 3 ], [ 1, 2, 3 ], [ 1, 4, 9 ]);
    multiply(test, [ Math.E, Math.E ], [ 1, Math.PI ], [ Math.E, Math.E * Math.PI ]);
    multiply(test, [ 1, 1, 1 ], [ -1, 1 ], [ -1, 1, -1 ]);
    multiply(test, [ -1, 1 ], [ 1, 1, 1 ], [ -1, 1, -1 ]);
};

exports['divide numbers'] = function (test) {
    divide(test, 1, 2, 1/2);
    divide(test, Math.PI, Math.E, Math.PI / Math.E);
    divide(test, -1, 1, -1);
};

exports['divide number and vector'] = function (test) {
    divide(test, 1, [ 1, 2, 3 ], [ 1, 1/2, 1/3 ]);
    divide(test, Math.PI, [ Math.E, Math.E ], [ Math.PI / Math.E, Math.PI / Math.E ]);
    divide(test, -1, [ 1, 1, 1 ], [ -1, -1, -1 ]);
};

exports['divide vector and number'] = function (test) {
    divide(test, [ 1, 2, 3 ], 1, [ 1, 2, 3 ]);
    divide(test, [ Math.E, Math.E ], Math.PI, [ Math.E / Math.PI, Math.E / Math.PI ]);
    divide(test, [ 1, 1, 1 ], -2, [ -1/2, -1/2, -1/2 ]);
};

exports['divide vector and vector'] = function (test) {
    divide(test, [ 1, 2, 3 ], [ 1, 2, 3 ], [ 1, 1, 1 ]);
    divide(test, [ Math.E, Math.E ], [ 1, Math.PI ], [ Math.E, Math.E / Math.PI ]);
    divide(test, [ 1, 1, 1 ], [ -1, 1 ], [ -1, 1, -1 ]);
    divide(test, [ -1, 1 ], [ 1, 1, 2 ], [ -1, 1, -1/2 ]);
};

exports['power numbers'] = function (test) {
    power(test, 1, 2, 1);
    power(test, Math.PI, Math.E, Math.PI ** Math.E);
    power(test, -1, 1, -1);
};

exports['power number and vector'] = function (test) {
    power(test, 1, [ 1, 2, 3 ], [ 1, 1, 1 ]);
    power(test, 2, [ 1, 2, 3 ], [ 2, 4, 8 ]);
    power(test, Math.PI, [ Math.E, Math.E ], [ Math.PI ** Math.E, Math.PI ** Math.E ]);
    power(test, -1, [ 1, 1, 1 ], [ -1, -1, -1 ]);
};

exports['power vector and number'] = function (test) {
    power(test, [ 1, 2, 3 ], 1, [ 1, 2, 3 ]);
    power(test, [ 1, 2, 3 ], 2, [ 1, 4, 9 ]);
    power(test, [ Math.E, Math.E ], Math.PI, [ Math.E ** Math.PI, Math.E ** Math.PI ]);
    power(test, [ 1, 2, 1 ], -2, [ 1, 2 ** -2, 1 ]);
};

exports['power vector and vector'] = function (test) {
    power(test, [ 1, 2, 3 ], [ 1, 2, 3 ], [ 1, 2 ** 2, 3 ** 3 ]);
    power(test, [ Math.E, Math.E ], [ 1, Math.PI ], [ Math.E, Math.E ** Math.PI ]);
    power(test, [ 1, 1, 1 ], [ -1, 1 ], [ 1, 1, 1 ]);
    power(test, [ 2, 3, 4 ], [ -2, 2 ], [ 2 ** -2, 3 ** 2, 4 ** -2 ]);
    power(test, [ -2, 3 ], [ 1, 1, 2 ], [ -2, 3, 4 ]);
};

exports['min numbers'] = function (test) {
    min(test, 1, 1);
    min(test, -1, -1);
};

exports['min vectors'] = function (test) {
    min(test, [], Infinity);
    min(test, [ 1, 2, 3 ], 1);
    min(test, [ 3, 2, 1 ], 1);
    min(test, [ 3, 1, 2 ], 1);
    min(test, [ -1, 2, 3 ], -1);
    min(test, [ -1, 2, -3 ], -3);
};

exports['max numbers'] = function (test) {
    max(test, 1, 1);
    max(test, -1, -1);
};

exports['max vectors'] = function (test) {
    max(test, [], -Infinity);
    max(test, [ 1, 2, 3 ], 3);
    max(test, [ 3, 2, 1 ], 3);
    max(test, [ 3, 1, 2 ], 3);
    max(test, [ -1, 2, 3 ], 3);
    max(test, [ -1, 2, -3 ], 2);
};

exports['sum numbers'] = function (test) {
    sum(test, 1, 1);
    sum(test, -1, -1);
};

exports['sum vectors'] = function (test) {
    sum(test, [ ], 0);
    sum(test, [ 1, 2, 3 ], 6);
    sum(test, [ 3, 2, 1 ], 6);
    sum(test, [ 3, 1, 2 ], 6);
    sum(test, [ -1, 2, 3 ], 4);
    sum(test, [ -1, 2, -3 ], -2);
};

exports['prod numbers'] = function (test) {
    prod(test, 1, 1);
    prod(test, -1, -1);
};

exports['prod vectors'] = function (test) {
    prod(test, [ ], 1);
    prod(test, [ 1, 2, 3 ], 6);
    prod(test, [ 3, 2, 1 ], 6);
    prod(test, [ 3, 1, 2 ], 6);
    prod(test, [ -1, 2, 3 ], -6);
    prod(test, [ -1, 2, -3 ], 6);
};

exports['length elements'] = function (test) {
    length(test, 1, 1);
    length(test, "foo", 1);
};

exports['length vectors'] = function (test) {
    length(test, [ ], 0);
    length(test, [ 1, 2, 3 ], 3);
    length(test, [ 3, 2, 1 ], 3);
    length(test, [ 3, 1, 2 ], 3);
    length(test, [ -1, 2, 3 ], 3);
    length(test, [ -1, 2 ], 2);
};

exports['mean numbers'] = function (test) {
    mean(test, 1, 1);
    mean(test, 2, 2);
};

exports['mean vectors'] = function (test) {
    mean(test, [ ], NaN);
    mean(test, [ 1, 2, 3 ], 2);
    mean(test, [ 3, 2, 1 ], 2);
    mean(test, [ 3, 1, 2 ], 2);
    mean(test, [ -1, 2, 3 ], 4/3);
    mean(test, [ -1, 2 ], 1/2);
};

exports['var numbers'] = function (test) {
    varfn(test, 1, NaN);
    varfn(test, 2, NaN);
};

exports['var vectors'] = function (test) {
    // TODO in R, var over empty vector returns error
    // varfn(test, [ ], NaN);
    
    varfn(test, [ 4, 4 ], 0);
    varfn(test, [ 4, 6 ], 2);
    varfn(test, [ 1, 2, 3 ], 1);
};

exports['not numbers'] = function (test) {
    // TODO in R, these not operations returns error
    // not(test, null, NaN);
    // not(test, "foo", NaN);
    
    not(test, 0, true);
    not(test, 1, false);
    not(test, 2, false);
};

exports['not vectors'] = function (test) {
    // TODO in R, not over empty vector returns error
    // not(test, [ ], NaN);
    
    not(test, [ 0, 4 ], [ true, false ]);
    not(test, [ 4, 4 ], [ false, false ]);
    not(test, [ 4, 6 ], [ false, false ]);
    not(test, [ 1, 2, 3 ], [ false, false, false ]);
};

