
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

exports['parse TRUE'] = function (test) {
    const result = parser.parse('logical', 'TRUE');
    
    test.ok(result);
    test.equal(result.ntype(), 'constant');
    test.strictEqual(result.value(), true);
};

exports['parse FALSE'] = function (test) {
    const result = parser.parse('logical', 'FALSE');
    
    test.ok(result);
    test.equal(result.ntype(), 'constant');
    test.strictEqual(result.value(), false);
};

