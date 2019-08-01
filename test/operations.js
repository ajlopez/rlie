
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

function minus(test, x, expected) {
    apply1(test, 'minus', x, expected);
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

function less(test, x, y, expected) {
    apply2(test, 'less', x, y, expected);
}

function lessEqual(test, x, y, expected) {
    apply2(test, 'lessEqual', x, y, expected);
}

function greater(test, x, y, expected) {
    apply2(test, 'greater', x, y, expected);
}

function greaterEqual(test, x, y, expected) {
    apply2(test, 'greaterEqual', x, y, expected);
}

function equal(test, x, y, expected) {
    apply2(test, 'equal', x, y, expected);
}

function notEqual(test, x, y, expected) {
    apply2(test, 'notEqual', x, y, expected);
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

function integerDivide(test, x, y, expected) {
    apply2(test, 'integerDivide', x, y, expected);
}

function mod(test, x, y, expected) {
    apply2(test, 'mod', x, y, expected);
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

exports['integer divide numbers'] = function (test) {
    integerDivide(test, 1, 2, 0);
    integerDivide(test, 3, 2, 1);
    integerDivide(test, -3, 2, -2);
};

exports['integer divide number and vector'] = function (test) {
    integerDivide(test, 1, [ 1, 2, 3 ], [ 1, 0, 0 ]);
    integerDivide(test, 7, [ 1, 2, 3 ], [ 7, 3, 2 ]);
    integerDivide(test, -7, [ 1, 2, 3 ], [ -7, -4, -3 ]);
};

exports['integer divide vector and number'] = function (test) {
    integerDivide(test, [ 1, 2, 3 ], 1, [ 1, 2, 3 ]);
    integerDivide(test, [ 1, 2, 3 ], 2, [ 0, 1, 1 ]);
    integerDivide(test, [ -1, -2, -3 ], 2, [ -1, -1, -2 ]);
};

exports['integer divide vector and vector'] = function (test) {
    integerDivide(test, [ 1, 2, 3 ], [ 1, 2, 3 ], [ 1, 1, 1 ]);
    integerDivide(test, [ 1, 1, 1 ], [ -1, 1 ], [ -1, 1, -1 ]);
    integerDivide(test, [ -1, 1 ], [ 1, 1, 2 ], [ -1, 1, -1 ]);
};

exports['mod numbers'] = function (test) {
    mod(test, 3, 2, 1);
    mod(test, 2, 2, 0);
    mod(test, -3, 2, -1);
};

exports['mod number and vector'] = function (test) {
    mod(test, 1, [ 1, 2, 3 ], [ 0, 1, 1 ]);
    mod(test, 5, [ 1, 2, 3 ], [ 0, 1, 2 ]);
};

exports['mod vector and number'] = function (test) {
    mod(test, [ 1, 2, 3 ], 2, [ 1, 0, 1 ]);
    mod(test, [ 5, 7, 3 ], 2, [ 1, 1, 1 ]);
};

exports['mod vector and vector'] = function (test) {
    mod(test, [ 1, 2, 3 ], [ 1, 2, 3 ], [ 0, 0, 0 ]);
    mod(test, [ 5, 7 ], [ 1, 2, 3 ], [ 0, 1, 2 ]);
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

exports['minus numbers'] = function (test) {
    minus(test, 1, -1);
    minus(test, -1, 1);
    minus(test, 0, 0);
};

exports['minus vectors'] = function (test) {
    minus(test, [ ], [ ]);
    minus(test, [ 1, 2, 3 ], [ -1, -2, -3 ]);
    minus(test, [ 3, 2, 1 ], [ -3, -2, -1 ]);
    minus(test, [ 3, 1, 2 ], [ -3, -1, -2 ]);
    minus(test, [ -1, 2, 3 ], [ 1, -2, -3 ]);
    minus(test, [ -1, 2, -3 ], [ 1, -2, 3 ]);
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

exports['less numbers'] = function (test) {
    less(test, 1, 2, true);
    less(test, -2, -1, true);
    less(test, 2, 2, false);
    less(test, 2, 0, false);
};

exports['less number vector'] = function (test) {
    less(test, 1, [ 1, 2 ], [ false, true ]);
    less(test, -2, [ -1, 2 ], [ true, true ]);
    less(test, 2, [ 0, 2 ], [ false, false ]);
    less(test, 2, [ 0, 0 ], [ false, false ]);
};

exports['less vector number'] = function (test) {
    less(test, [ 1, 0 ], 1, [ false, true ]);
    less(test, [ -1, 2 ], -2, [ false, false ]);
    less(test, [ 0, 2 ], 2, [ true, false ]);
    less(test, [ 0, 0 ], 2, [ true, true ]);
};

exports['less vector vector'] = function (test) {
    less(test, [ 1, 2 ], [ 1 ], [ false, false ]);
    less(test, [ 1, 0 ], [ 1, 2 ], [ false, true ]);
    less(test, [ -1, 2 ], [ -2, -2 ], [ false, false ]);
    less(test, [ 0, 2 ], [ 2, 2 ], [ true, false ]);
    less(test, [ 0, 0 ], [ 2, 3, -1 ], [ true, true, false ]);
};

exports['less equal numbers'] = function (test) {
    lessEqual(test, 1, 2, true);
    lessEqual(test, -2, -1, true);
    lessEqual(test, 2, 2, true);
    lessEqual(test, 2, 0, false);
};

exports['less equal number vector'] = function (test) {
    lessEqual(test, 1, [ 1, 2 ], [ true, true ]);
    lessEqual(test, -2, [ -1, 2 ], [ true, true ]);
    lessEqual(test, 2, [ 0, 2 ], [ false, true ]);
    lessEqual(test, 2, [ 0, 0 ], [ false, false ]);
};

exports['less equal vector number'] = function (test) {
    lessEqual(test, [ 1, 0 ], 1, [ true, true ]);
    lessEqual(test, [ -1, 2 ], -2, [ false, false ]);
    lessEqual(test, [ 0, 2 ], 2, [ true, true ]);
    lessEqual(test, [ 0, 0 ], 2, [ true, true ]);
};

exports['less equal vector vector'] = function (test) {
    lessEqual(test, [ 1, 2 ], [ 1 ], [ true, false ]);
    lessEqual(test, [ 1, 0 ], [ 1, 2 ], [ true, true ]);
    lessEqual(test, [ -1, 2 ], [ -2, -2 ], [ false, false ]);
    lessEqual(test, [ 0, 2 ], [ 2, 2 ], [ true, true ]);
    lessEqual(test, [ 0, 0 ], [ 2, 3, -1 ], [ true, true, false ]);
};

exports['greater numbers'] = function (test) {
    greater(test, 1, 2, false);
    greater(test, -2, -1, false);
    greater(test, 2, 2, false);
    greater(test, 2, 0, true);
};

exports['greater number vector'] = function (test) {
    greater(test, 1, [ 1, 2 ], [ false, false ]);
    greater(test, -2, [ -1, 2 ], [ false, false ]);
    greater(test, 2, [ 0, 2 ], [ true, false ]);
    greater(test, 2, [ 0, 0 ], [ true, true ]);
};

exports['greater vector number'] = function (test) {
    greater(test, [ 1, 2 ], 1, [ false, true ]);
    greater(test, [ -3, 2 ], -2, [ false, true ]);
    greater(test, [ 3, 2 ], 2, [ true, false ]);
    greater(test, [ 3, 6 ], 2, [ true, true ]);
};

exports['greater vector vector'] = function (test) {
    greater(test, [ 1, 2 ], [ 1 ], [ false, true ]);
    greater(test, [ 1, 3 ], [ 1, 2 ], [ false, true ]);
    greater(test, [ -3, 2 ], [ -2, -2 ], [ false, true ]);
    greater(test, [ 0, 2 ], [ 2, 2 ], [ false, false ]);
    greater(test, [ 0, 0 ], [ 2, 3, -1 ], [ false, false, true ]);
};

exports['greater equal numbers'] = function (test) {
    greaterEqual(test, 1, 2, false);
    greaterEqual(test, -2, -1, false);
    greaterEqual(test, 2, 2, true);
    greaterEqual(test, 2, 0, true);
};

exports['greater equal number vector'] = function (test) {
    greaterEqual(test, 1, [ 1, 2 ], [ true, false ]);
    greaterEqual(test, -2, [ -1, 2 ], [ false, false ]);
    greaterEqual(test, 2, [ 0, 2 ], [ true, true ]);
    greaterEqual(test, 2, [ 0, 0 ], [ true, true ]);
};

exports['greater equal vector number'] = function (test) {
    greaterEqual(test, [ 1, 2 ], 1, [ true, true ]);
    greaterEqual(test, [ -3, 2 ], -2, [ false, true ]);
    greaterEqual(test, [ 3, 2 ], 2, [ true, true ]);
    greaterEqual(test, [ 3, 6 ], 2, [ true, true ]);
};

exports['greater equal vector vector'] = function (test) {
    greaterEqual(test, [ 1, 2 ], [ 1 ], [ true, true ]);
    greaterEqual(test, [ 1, 3 ], [ 1, 2 ], [ true, true ]);
    greaterEqual(test, [ -3, 2 ], [ -2, -2 ], [ false, true ]);
    greaterEqual(test, [ 0, 2 ], [ 2, 2 ], [ false, true ]);
    greaterEqual(test, [ 0, 0 ], [ 2, 3, -1 ], [ false, false, true ]);
};

exports['equal numbers'] = function (test) {
    equal(test, 1, 2, false);
    equal(test, -2, -1, false);
    equal(test, 2, 2, true);
    equal(test, 2, 0, false);
};

exports['equal number vector'] = function (test) {
    equal(test, 1, [ 1, 2 ], [ true, false ]);
    equal(test, -2, [ -1, 2 ], [ false, false ]);
    equal(test, 2, [ 0, 2 ], [ false, true ]);
    equal(test, 2, [ 0, 2 ], [ false, true ]);
};

exports['equal vector number'] = function (test) {
    equal(test, [ 1, 2 ], 1, [ true, false ]);
    equal(test, [ -3, 2 ], -2, [ false, false ]);
    equal(test, [ 3, 2 ], 2, [ false, true ]);
    equal(test, [ 3, 6 ], 2, [ false, false ]);
};

exports['equal vector vector'] = function (test) {
    equal(test, [ 1, 2 ], [ 1 ], [ true, false ]);
    equal(test, [ 1, 3 ], [ 1, 2 ], [ true, false ]);
    equal(test, [ -3, 2 ], [ -2, -2 ], [ false, false ]);
    equal(test, [ 0, 2 ], [ 2, 2 ], [ false, true ]);
    equal(test, [ 0, 0 ], [ 2, 3, -1 ], [ false, false, false ]);
};

exports['not equal numbers'] = function (test) {
    notEqual(test, 1, 2, true);
    notEqual(test, -2, -1, true);
    notEqual(test, 2, 2, false);
    notEqual(test, 2, 0, true);
};

exports['not equal number vector'] = function (test) {
    notEqual(test, 1, [ 1, 2 ], [ false, true ]);
    notEqual(test, -2, [ -1, 2 ], [ true, true ]);
    notEqual(test, 2, [ 0, 2 ], [ true, false ]);
    notEqual(test, 2, [ 0, 2 ], [ true, false ]);
};

exports['not equal vector number'] = function (test) {
    notEqual(test, [ 1, 2 ], 1, [ false, true ]);
    notEqual(test, [ -3, 2 ], -2, [ true, true ]);
    notEqual(test, [ 3, 2 ], 2, [ true, false ]);
    notEqual(test, [ 3, 6 ], 2, [ true, true ]);
};

exports['not equal vector vector'] = function (test) {
    notEqual(test, [ 1, 2 ], [ 1 ], [ false, true ]);
    notEqual(test, [ 1, 3 ], [ 1, 2 ], [ false, true ]);
    notEqual(test, [ -3, 2 ], [ -2, -2 ], [ true, true ]);
    notEqual(test, [ 0, 2 ], [ 2, 2 ], [ true, false ]);
    notEqual(test, [ 0, 0 ], [ 2, 3, -1 ], [ true, true, true ]);
};

exports['exp operation'] = function (test) {
    test.equal(operations.exp(0), Math.exp(0));
    test.equal(operations.exp(1), Math.exp(1));
    test.equal(operations.exp(2), Math.exp(2));
    apply1(test, 'exp', [ 0, 1, 2 ], [ Math.exp(0), Math.exp(1), Math.exp(2) ]);
};

exports['log operation'] = function (test) {
    test.equal(operations.log(1), Math.log(1));
    test.equal(operations.log(2), Math.log(2));
    test.equal(operations.log(3), Math.log(3));
    apply1(test, 'log', [ 1, 2, 3 ], [ Math.log(1), Math.log(2), Math.log(3) ]);
};

exports['sqrt operation'] = function (test) {
    test.equal(operations.sqrt(1), Math.sqrt(1));
    test.equal(operations.sqrt(2), Math.sqrt(2));
    test.equal(operations.sqrt(3), Math.sqrt(3));
    apply1(test, 'sqrt', [ 1, 2, 3 ], [ Math.sqrt(1), Math.sqrt(2), Math.sqrt(3) ]);
};

exports['dim operation'] = function (test) {
    test.deepEqual(operations.dim(vectors.matrix([ 1, 2, 3, 4, 5, 6 ], 2, 3 )).elements(), [ 2, 3 ]);
    test.equal(operations.dim(42), null);
};

exports['nrow operation'] = function (test) {
    test.deepEqual(operations.nrow(vectors.matrix([ 1, 2, 3, 4, 5, 6 ], 2, 3 )), 2);
    test.equal(operations.nrow(42), null);
};

exports['ncol operation'] = function (test) {
    test.deepEqual(operations.ncol(vectors.matrix([ 1, 2, 3, 4, 5, 6 ], 2, 3 )), 3);
    test.equal(operations.ncol(42), null);
};

exports['abs operation'] = function (test) {
    test.equal(operations.abs(1), Math.abs(1));
    test.equal(operations.abs(2), Math.abs(2));
    test.equal(operations.abs(-3), Math.abs(-3));
    apply1(test, 'abs', [ 1, 2, -3 ], [ Math.abs(1), Math.abs(2), Math.abs(-3) ]);
};

