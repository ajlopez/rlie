
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

exports['parse NULL'] = function (test) {
    const result = parser.parse('null', 'NULL');
    
    test.ok(result);
    test.equal(result.ntype(), 'constant');
    test.strictEqual(result.value(), null);
};

exports['parse name'] = function (test) {
    const result = parser.parse('name', 'foo');
    
    test.ok(result);
    test.equal(result.ntype(), 'name');
    test.strictEqual(result.name(), 'foo');
};

exports['parse add'] = function (test) {
    const result = parser.parse('expression', '2+40');
    
    test.ok(result);
    test.equal(result.ntype(), 'binary');
    test.equal(result.operator(), '+');
    test.strictEqual(result.left().value(), 2);
    test.strictEqual(result.right().value(), 40);
};

exports['parse less'] = function (test) {
    const result = parser.parse('expression', '2<40');
    
    test.ok(result);
    test.equal(result.ntype(), 'binary');
    test.equal(result.operator(), '<');
    test.strictEqual(result.left().value(), 2);
    test.strictEqual(result.right().value(), 40);
};

exports['parse indexed term'] = function (test) {
    const result = parser.parse('term', 'foo[42]');
    
    test.ok(result);
    test.equal(result.ntype(), 'indexed');
    test.equal(result.target().ntype(), 'name');
    test.equal(result.target().name(), 'foo');
    test.strictEqual(result.index().ntype(), 'constant');
    test.strictEqual(result.index().value(), 42);
};

exports['parse range term'] = function (test) {
    const result = parser.parse('term', '1:42');
    
    test.ok(result);
    test.equal(result.ntype(), 'range');
    test.equal(result.from().ntype(), 'constant');
    test.equal(result.from().value(), 1);
    test.equal(result.to().ntype(), 'constant');
    test.equal(result.to().value(), 42);
};


