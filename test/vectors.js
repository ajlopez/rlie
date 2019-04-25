
const vectors = require('../lib/vectors');

exports['create vector'] = function (test) {
    const vector = vectors.vector([1, 2, 3]);
    
    test.ok(vector);
    test.equal(typeof vector, 'object');
    test.equal(vector.length(), 3);
    test.deepEqual(vector.elements(), [ 1, 2, 3 ]);
};

exports['get element'] = function (test) {
    const vector = vectors.vector([1, 4, 9]);
    
    test.equal(vector.get(1), 1);
    test.equal(vector.get(2), 4);
    test.equal(vector.get(3), 9);
};

exports['create vector with vectors'] = function (test) {
    const v0 = vectors.vector([1, 2, 3]);
    const vector = vectors.vector([ v0, 2, v0 ]);
    
    test.ok(vector);
    test.equal(typeof vector, 'object');
    test.equal(vector.length(), 7);
    test.deepEqual(vector.elements(), [ 1, 2, 3, 2, 1, 2, 3 ]);
};

exports['resize vector'] = function (test) {
    const v0 = vectors.vector([ 1, 2, 3 ]);
    
    test.deepEqual(vectors.resize(v0, 3).elements(), [ 1, 2, 3 ]);
    test.deepEqual(vectors.resize(v0, 2).elements(), [ 1, 2 ]);
    test.deepEqual(vectors.resize(v0, 5).elements(), [ 1, 2, 3, 1, 2 ]);
    test.deepEqual(vectors.resize(v0, 0).elements(), [ ]);
    test.deepEqual(vectors.resize(vectors.vector([]), 3).elements(), [ 0, 0, 0 ]);
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

