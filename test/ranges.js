
const ranges = require('../lib/ranges');

exports['create range with 3 values'] = function (test) {
    const range = ranges.range(1, 3);
    
    test.ok(range);
    test.equal(range.next(), 1);
    test.equal(range.next(), 2);
    test.equal(range.next(), 3);
    test.equal(range.next(), null);
};

exports['retrieve range values twice'] = function (test) {
    const range = ranges.range(1, 3);
    
    test.ok(range);
    test.equal(range.next(), 1);
    test.equal(range.next(), 2);
    test.equal(range.next(), 3);
    test.equal(range.next(), null);
    
    test.equal(range.next(), 1);
    test.equal(range.next(), 2);
    test.equal(range.next(), 3);
    test.equal(range.next(), null);
};

exports['range elements'] = function (test) {
    const range = ranges.range(1, 3);
    
    test.ok(range);
    test.deepEqual(range.elements(), [ 1, 2, 3 ]);
};

exports['range length'] = function (test) {
    const range = ranges.range(1, 3);
    
    test.ok(range);
    test.equal(range.length(), 3);
};

exports['create range with 4 values and negative implicit step'] = function (test) {
    const range = ranges.range(1, -2);
    
    test.ok(range);
    test.equal(range.next(), 1);
    test.equal(range.next(), 0);
    test.equal(range.next(), -1);
    test.equal(range.next(), -2);
    test.equal(range.next(), null);
};

