
const parser = require('../lib/parser');

exports['parse integer'] = function (test) {
    const result = parser.parse('integer', '42');
    
    test.ok(result);
    test.equal(result.ntype(), 'constant');
    test.strictEqual(result.value(), 42);
};

exports['parse real'] = function (test) {
    const result = parser.parse('real', '3.14159');
    
    test.ok(result);
    test.equal(result.ntype(), 'constant');
    test.strictEqual(result.value(), 3.14159);
};

exports['parse string'] = function (test) {
    const result = parser.parse('string', '"foo"');
    
    test.ok(result);
    test.equal(result.ntype(), 'constant');
    test.strictEqual(result.value(), "foo");
};

