
const rlie = require('..');
const vectors = require('../lib/vectors');

function evaluate(test, text, expected) {
    let result = rlie.evaluate(text);
    
    if (isNaN(result) && isNaN(expected))
        return;
    
    if (result && typeof result.elements === 'function')
        result = result.elements();
    
    if (Array.isArray(result))
        test.deepEqual(result, expected);
    else
        test.strictEqual(rlie.evaluate(text), expected);
}

exports['evaluate constants'] = function (test) {
    evaluate(test, '42', 42);
    evaluate(test, '"foo"', 'foo');
    evaluate(test, 'TRUE', true);
    evaluate(test, 'FALSE', false);
    evaluate(test, 'NULL', null);
};

exports['evaluate negative numbers'] = function (test) {
    evaluate(test, '-42', -42);
    evaluate(test, '-3.14159', -3.14159);
};

exports['evaluate negative vectors'] = function (test) {
    evaluate(test, '-c(1, 2, 3)', [ -1, -2, - 3 ]);
    evaluate(test, '-c()', []);
};

exports['evaluate sequences'] = function (test) {
    evaluate(test, 'seq(1, 3)', [ 1, 2, 3 ]);
    evaluate(test, 'seq(1, -2)', [ 1, 0, -1, -2 ]);
};

exports['evaluate negative sequences'] = function (test) {
    evaluate(test, '-seq(1, 3)', [ -1, -2, -3 ]);
    evaluate(test, '-seq(1, -2)', [ -1, 0, 1, 2 ]);
};

exports['evaluate add sequences'] = function (test) {
    evaluate(test, 'seq(1,3) + seq(1, 3)', [ 1, 4, 6 ]);
};

exports['evaluate array'] = function (test) {
    let result = rlie.evaluate('array(c(1, 2, 3), c(3))');
    
    test.ok(vectors.isArray(result));
    test.deepEqual(result.dimensions().elements(), [ 3 ]);
    test.deepEqual(result.elements(), [ 1, 2, 3 ]);
};

exports['evaluate min, max'] = function (test) {
    evaluate(test, 'min(1)', 1);
    evaluate(test, 'min(c())', Infinity);
    evaluate(test, 'min(c(1, 2, 3))', 1);
    evaluate(test, 'max(1)', 1);
    evaluate(test, 'max(c())', -Infinity);
    evaluate(test, 'max(c(1, 2, 3))', 3);
};

exports['evaluate mean'] = function (test) {
    evaluate(test, 'mean(1)', 1);
    evaluate(test, 'mean(c())', NaN);
    evaluate(test, 'mean(c(1, 2, 3))', 2);
};

exports['evaluate var'] = function (test) {
    evaluate(test, 'var(1)', NaN);
    evaluate(test, 'var(c(4, 6))', 2);
    evaluate(test, 'var(c(1, 2, 3))', 1);
};

exports['evaluate arithmetic operations'] = function (test) {
    evaluate(test, '1+2', 3);
    evaluate(test, '2+40', 42);
    evaluate(test, '2*21', 42);
    evaluate(test, '3^2', 9);
    evaluate(test, '84/2', 42);
    evaluate(test, '3*4/2', 6);
    evaluate(test, '3+4/2', 5);
    evaluate(test, '(6+4)/2', 5);
};

exports['evaluate vectors'] = function (test) {
    evaluate(test, 'c()', []);
    evaluate(test, 'c(1, 4, 9)', [ 1, 4, 9 ]);
    evaluate(test, 'c(1, c(2, 3, 4), 5)', [ 1, 2, 3, 4, 5 ]);
};

exports['evaluate sum'] = function (test) {
    evaluate(test, 'sum(c())', 0);
    evaluate(test, 'sum(c(1, 2, 3))', 6);
    evaluate(test, 'sum(4)', 4);
};

exports['evaluate prod'] = function (test) {
    evaluate(test, 'prod(c())', 1);
    evaluate(test, 'prod(c(1, 2, 3))', 6);
    evaluate(test, 'prod(4)', 4);
};

exports['evaluate length'] = function (test) {
    evaluate(test, 'length(c())', 0);
    evaluate(test, 'length(c(1, 2, 3))', 3);
    evaluate(test, 'length(4)', 1);
};

exports['evaluate assign'] = function (test) {
    evaluate(test, 'answer <- 42\r\nanswer', [ 42, 42 ]);
    evaluate(test, '1 -> one\r\none', [ 1, 1 ]);
};


