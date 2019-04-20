
const interpreter = require('../lib/interpreter');
const parser = require('../lib/parser');
const contexts = require('../lib/contexts');
const vectors = require('../lib/vectors');

function process(test, text, expected, context) {
    const node = parser.parse('expression', text);
    const result = interpreter.process(node, context);
    
    if (vectors.isVector(result))
        test.deepEqual(result.elements(), expected);
    else
        test.strictEqual(result, expected);
}

exports['process constants'] = function (test) {
    process(test, '42', 42);
    process(test, '3.14159', 3.14159);
    process(test, '"foo"', "foo");
    process(test, 'TRUE', true);
    process(test, 'FALSE', false);
    process(test, 'NULL', null);
};

exports['process name'] = function (test) {
    const context = contexts.context();
    context.set('answer', 42);
    
    process(test, 'answer', 42, context);
};

exports['process call'] = function (test) {
    const context = contexts.context();
    context.set('c', function (args) { return vectors.vector(args); });
    
    process(test, 'c(1, 2, 3)', [ 1, 2, 3 ], context);
    process(test, 'c(1, c(2, 3, 4), 5)', [ 1, 2, 3, 4, 5 ], context);
};

exports['process binary arithmetic operations with numbers'] = function (test) {
    process(test, '2+40', 42);
    process(test, '2*21', 42);
    process(test, '44-2', 42);
    process(test, '84/2', 42);
};

exports['process binary arithmetic operations with numbers using precedence'] = function (test) {
    process(test, '2+20*2', 42);
    process(test, '2*20+2', 42);
    process(test, '22*2-2', 42);
    process(test, '80/2+2', 42);
    process(test, '2+80/2', 42);
};

exports['process binary arithmetic operations with numbers using parentheses'] = function (test) {
    process(test, '(1+20)*2', 42);
    process(test, '2*(20+1)', 42);
};
