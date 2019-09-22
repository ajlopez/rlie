
const parser = require('../lib/parser');
const geast = require('geast');

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

exports['parse mod'] = function (test) {
    const result = parser.parse('expression', '7 %% 2');
    
    test.ok(result);
    test.equal(result.ntype(), 'binary');
    test.equal(result.operator(), '%%');
    test.strictEqual(result.left().value(), 7);
    test.strictEqual(result.right().value(), 2);
};

exports['parse integer division'] = function (test) {
    const result = parser.parse('expression', '7 %/% 2');
    
    test.ok(result);
    test.equal(result.ntype(), 'binary');
    test.equal(result.operator(), '%/%');
    test.strictEqual(result.left().value(), 7);
    test.strictEqual(result.right().value(), 2);
};

exports['parse logical and'] = function (test) {
    const result = parser.parse('expression', '7 & 2');
    
    test.ok(result);
    test.equal(result.ntype(), 'binary');
    test.equal(result.operator(), '&');
    test.strictEqual(result.left().value(), 7);
    test.strictEqual(result.right().value(), 2);
};

exports['parse logical or'] = function (test) {
    const result = parser.parse('expression', '7 | 2');
    
    test.ok(result);
    test.equal(result.ntype(), 'binary');
    test.equal(result.operator(), '|');
    test.strictEqual(result.left().value(), 7);
    test.strictEqual(result.right().value(), 2);
};

exports['parse logical double and'] = function (test) {
    const result = parser.parse('expression', '7 && 2');
    
    test.ok(result);
    test.equal(result.ntype(), 'binary');
    test.equal(result.operator(), '&&');
    test.strictEqual(result.left().value(), 7);
    test.strictEqual(result.right().value(), 2);
};

exports['parse logical double or'] = function (test) {
    const result = parser.parse('expression', '7 || 2');
    
    test.ok(result);
    test.equal(result.ntype(), 'binary');
    test.equal(result.operator(), '||');
    test.strictEqual(result.left().value(), 7);
    test.strictEqual(result.right().value(), 2);
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
    test.equal(result.target().name(), 'foo');
    test.ok(Array.isArray(result.index()));
    test.equal(result.index().length, 1);
    test.strictEqual(result.index()[0].ntype(), 'constant');
    test.strictEqual(result.index()[0].value(), 42);
};

exports['parse indexed term with two indices'] = function (test) {
    const result = parser.parse('term', 'foo[42, 2]');
    
    test.ok(result);
    test.equal(result.ntype(), 'indexed');
    test.equal(result.target().name(), 'foo');
    test.ok(Array.isArray(result.index()));
    test.equal(result.index().length, 2);
    test.strictEqual(result.index()[0].ntype(), 'constant');
    test.strictEqual(result.index()[0].value(), 42);
    test.strictEqual(result.index()[1].ntype(), 'constant');
    test.strictEqual(result.index()[1].value(), 2);
};

exports['parse indexed term without first index'] = function (test) {
    const result = parser.parse('term', 'foo[, 42]');
    
    test.ok(result);
    test.equal(result.ntype(), 'indexed');
    test.equal(result.target().name(), 'foo');
    test.ok(Array.isArray(result.index()));
    test.equal(result.index().length, 2);
    test.strictEqual(result.index()[0].ntype(), 'constant');
    test.strictEqual(result.index()[0].value(), null);
    test.strictEqual(result.index()[1].ntype(), 'constant');
    test.strictEqual(result.index()[1].value(), 42);
};

exports['parse indexed term without second index'] = function (test) {
    const result = parser.parse('term', 'foo[42, ]');
    
    test.ok(result);
    test.equal(result.ntype(), 'indexed');
    test.equal(result.target().name(), 'foo');
    test.ok(Array.isArray(result.index()));
    test.equal(result.index().length, 2);
    test.strictEqual(result.index()[0].ntype(), 'constant');
    test.strictEqual(result.index()[0].value(), 42);
    test.strictEqual(result.index()[1].ntype(), 'constant');
    test.strictEqual(result.index()[1].value(), null);
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

exports['parse integer expression as command'] = function (test) {
    const result = parser.parse('command', '42');
    
    test.ok(result);
    test.equal(result.ntype(), 'constant');
    test.strictEqual(result.value(), 42);
};

exports['parse integer expression as command ending with new line'] = function (test) {
    const result = parser.parse('command', '42\n');
    
    test.ok(result);
    test.equal(result.ntype(), 'constant');
    test.strictEqual(result.value(), 42);
};

exports['parse integer expression as command ending with semicolon'] = function (test) {
    const result = parser.parse('command', '42;');
    
    test.ok(result);
    test.equal(result.ntype(), 'constant');
    test.strictEqual(result.value(), 42);
};

exports['parse composite command'] = function (test) {
    const result = parser.parse('command', '{ a <- 42; b <- 1; }');
    
    test.ok(result);
    
    test.deepEqual(geast.toObject(result), { ntype: 'sequence', nodes: [
        { ntype: 'assign', 
            lefthand: { ntype: 'name', name: 'a' },
            expression: { ntype: 'constant', value: 42 }
        },
        { ntype: 'assign', 
            lefthand: { ntype: 'name', name: 'b' },
            expression: { ntype: 'constant', value: 1 }
        }
    ] });
};

