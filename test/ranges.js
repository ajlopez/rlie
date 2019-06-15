
const ranges = require('../lib/ranges');

exports['create range with 3 values'] = function (test) {
    const range = ranges.range(1, 3);
    
    test.ok(range);
    test.equal(range.next(), 1);
    test.equal(range.next(), 2);
    test.equal(range.next(), 3);
    test.equal(range.next(), null);
};

