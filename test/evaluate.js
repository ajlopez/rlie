
const rlie = require('..');
const vectors = require('../lib/vectors');

function evaluate(test, text, expected) {
    const result = rlie.evaluate(text);
    
    if (vectors.isVector(result))
        test.deepEqual(result.elements(), expected);
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

