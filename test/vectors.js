
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

exports['is vector'] = function (test) {
    const vector = vectors.vector([ 1, 4, 9 ]);
    
    test.ok(vectors.isVector(vector));
    test.ok(!vectors.isVector(undefined));
    test.ok(!vectors.isVector(null));
    test.ok(!vectors.isVector('foo'));
    test.ok(!vectors.isVector(42));
    test.ok(!vectors.isVector(Math.PI));
    test.ok(!vectors.isVector(String));
    test.ok(!vectors.isVector([ 1, 4, 9 ]));
};

