
const vectors = require('../lib/vectors');

exports['create vector'] = function (test) {
    const vector = vectors.vector([1, 2, 3]);
    
    test.ok(vector);
    test.equal(typeof vector, 'object');
    test.equal(vector.length(), 3);
    test.deepEqual(vector.elements(), [ 1, 2, 3 ]);
};

exports['create vector with vectors'] = function (test) {
    const v0 = vectors.vector([1, 2, 3]);
    const vector = vectors.vector([ v0, 2, v0 ]);
    
    test.ok(vector);
    test.equal(typeof vector, 'object');
    test.equal(vector.length(), 7);
    test.deepEqual(vector.elements(), [ 1, 2, 3, 2, 1, 2, 3 ]);
};

