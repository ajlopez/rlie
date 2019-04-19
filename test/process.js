
const interpreter = require('../lib/interpreter');
const parser = require('../lib/parser');

function process(test, text, expected) {
    const node = parser.parse('expression', text);
    
    test.deepEqual(interpreter.process(node), expected);
}

exports['process constants'] = function (test) {
    process(test, '42', 42);
    process(test, '3.14159', 3.14159);
    process(test, '"foo"', "foo");
    process(test, 'TRUE', true);
    process(test, 'FALSE', false);
    process(test, 'NULL', null);
};

