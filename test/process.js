
const interpreter = require('../lib/interpreter');
const parser = require('../lib/parser');
const contexts = require('../lib/contexts');

function process(test, text, expected, context) {
    const node = parser.parse('expression', text);
    
    test.deepEqual(interpreter.process(node, context), expected);
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

