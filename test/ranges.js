
const ranges = require('../lib/ranges');

exports['create range with 3 values'] = function (test) {
    const range = ranges.range(1, 3);
    
    test.ok(range);
    test.equal(range.next(), 1);
    test.equal(range.next(), 2);
    test.equal(range.next(), 3);
    test.equal(range.next(), null);
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

