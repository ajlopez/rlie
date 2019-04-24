
const vectors = require('../lib/vectors');

exports['create array with dimensions'] = function (test) {
    const array = vectors.array([1, 2, 3, 4], [ 2, 2 ]);
    
    test.ok(array);
    test.equal(typeof array, 'object');
    test.equal(array.length(), 4);
    test.deepEqual(array.elements(), [ 1, 2, 3, 4 ]);
    test.deepEqual(array.dimensions().elements(), [ 2, 2 ]);
};

exports['create array with dimensions extending data'] = function (test) {
    const array = vectors.array([1, 2, 3, 4], [ 2, 3 ]);
    
    test.ok(array);
    test.equal(typeof array, 'object');
    test.equal(array.length(), 6);
    test.deepEqual(array.elements(), [ 1, 2, 3, 4, 1, 2 ]);
    test.deepEqual(array.dimensions().elements(), [ 2, 3 ]);
};

