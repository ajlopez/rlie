
const vectors = require('../lib/vectors');

exports['create array with dimensions'] = function (test) {
    const array = vectors.array([1, 2, 3, 4], [ 2, 2 ]);
    
    test.ok(array);
    test.equal(typeof array, 'object');
    test.equal(array.length(), 4);
    test.deepEqual(array.elements(), [ 1, 2, 3, 4 ]);
    test.deepEqual(array.dimensions().elements(), [ 2, 2 ]);
};

exports['create array with vector elements and dimensions'] = function (test) {
    const array = vectors.array(vectors.vector([1, 2, 3, 4]), [ 2, 2 ]);
    
    test.ok(array);
    test.equal(typeof array, 'object');
    test.equal(array.length(), 4);
    test.deepEqual(array.elements(), [ 1, 2, 3, 4 ]);
    test.deepEqual(array.dimensions().elements(), [ 2, 2 ]);
};

exports['get array elements'] = function (test) {
    const array = vectors.array([1, 2, 3, 4, 5, 6], [ 2, 3 ]);

    test.equal(array.get(1, 1), 1);
    test.equal(array.get(2, 1), 2);
    test.equal(array.get(1, 2), 3);
    test.equal(array.get(2, 2), 4);
    test.equal(array.get(1, 3), 5);
    test.equal(array.get(2, 3), 6);
};

exports['create array with dimensions extending data'] = function (test) {
    const array = vectors.array([1, 2, 3, 4], [ 2, 3 ]);
    
    test.ok(array);
    test.equal(typeof array, 'object');
    test.equal(array.length(), 6);
    test.deepEqual(array.elements(), [ 1, 2, 3, 4, 1, 2 ]);
    test.deepEqual(array.dimensions().elements(), [ 2, 3 ]);
};

exports['is array'] = function (test) {
    const array = vectors.array([1, 2, 3, 4], [ 2, 3 ]);
    
    test.ok(vectors.isArray(array));
    test.ok(!vectors.isArray(null));
    test.ok(!vectors.isArray(vectors.vector([1, 2, 3, 4])));
    test.ok(!vectors.isArray(42));
    test.ok(!vectors.isArray("foo")); 
};
