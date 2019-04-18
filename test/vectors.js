
const vectors = require('../lib/vectors');

exports['create vector'] = function (test) {
    const vector = vectors.vector([1, 2, 3]);
    
    test.ok(vector);
    test.equal(typeof vector, 'object');
    test.deepEqual(vector.elements(), [ 1, 2, 3 ]);
};

