
const operations = require('../lib/operations');

function add(test, x, y, expected) {
    test.equal(operations.add(x, y), expected);
}

exports['add numbers'] = function (test) {
    add(test, 1, 2, 3);
    add(test, Math.PI, Math.E, Math.PI + Math.E);
    add(test, -1, 1, 0);
};

