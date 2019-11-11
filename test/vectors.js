
const vectors = require('../lib/vectors');
const ranges = require('../lib/ranges');
const repetitions = require('../lib/repetitions');
const predicates = require('../lib/predicates');

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

exports['get negative element'] = function (test) {
    const vector = vectors.vector([1, 4, 9]);
    
    test.deepEqual(vector.get(-1).elements(), [ 4, 9 ]);
    test.deepEqual(vector.get(-2).elements(), [ 1, 9 ]);
    test.deepEqual(vector.get(-3).elements(), [ 1, 4 ]);
};

exports['get zero element'] = function (test) {
    const vector = vectors.vector([1, 4, 9]);
    
    test.deepEqual(vector.get(0).elements(), [ ]);
};

exports['get many elements using array'] = function (test) {
    const vector = vectors.vector([1, 4, 9]);
    
    test.deepEqual(vector.get([ 1, 2 ]).elements(), [ 1, 4 ]);
    test.deepEqual(vector.get([ 2, 3 ]).elements(), [ 4, 9 ]);
    test.deepEqual(vector.get([ 3, 2 ]).elements(), [ 9, 4 ]);
};

exports['create vector with vectors'] = function (test) {
    const v0 = vectors.vector([1, 2, 3]);
    const vector = vectors.vector([ v0, 2, v0 ]);
    
    test.ok(vector);
    test.equal(typeof vector, 'object');
    test.equal(vector.length(), 7);
    test.deepEqual(vector.elements(), [ 1, 2, 3, 2, 1, 2, 3 ]);
};

exports['create vector with ranges'] = function (test) {
    const r0 = ranges.range(1, 3);
    const vector = vectors.vector([ r0, 2, r0 ]);
    
    test.ok(vector);
    test.equal(typeof vector, 'object');
    test.equal(vector.length(), 7);
    test.deepEqual(vector.elements(), [ 1, 2, 3, 2, 1, 2, 3 ]);
};

exports['create vector with repetitions'] = function (test) {
    const r0 = repetitions.repetition(1, 3);
    const vector = vectors.vector([ r0, 2, r0 ]);
    
    test.ok(vector);
    test.equal(typeof vector, 'object');
    test.equal(vector.length(), 7);
    test.deepEqual(vector.elements(), [ 1, 1, 1, 2, 1, 1, 1 ]);
};

exports['resize vector'] = function (test) {
    const v0 = vectors.vector([ 1, 2, 3 ]);
    
    test.deepEqual(vectors.resize(v0, 3).elements(), [ 1, 2, 3 ]);
    test.deepEqual(vectors.resize(v0, 2).elements(), [ 1, 2 ]);
    test.deepEqual(vectors.resize(v0, 5).elements(), [ 1, 2, 3, 1, 2 ]);
    test.deepEqual(vectors.resize(v0, 0).elements(), [ ]);
    test.deepEqual(vectors.resize(vectors.vector([]), 3).elements(), [ 0, 0, 0 ]);
};

exports['create integer vector with length 3'] = function (test) {
    const vector = vectors.integer(3);
    
    test.ok(vector);
    test.equal(typeof vector, 'object');
    test.equal(vector.length(), 3);
    test.deepEqual(vector.elements(), [ 0, 0, 0 ]);
    
    test.ok(predicates.isInteger(vector));
};

exports['create integer vector with length 3.9'] = function (test) {
    const vector = vectors.integer(3.9);
    
    test.ok(vector);
    test.equal(typeof vector, 'object');
    test.equal(vector.length(), 3);
    test.deepEqual(vector.elements(), [ 0, 0, 0 ]);
    
    test.ok(predicates.isInteger(vector));
};

exports['create integer vector with length 0'] = function (test) {
    const vector = vectors.integer(0);
    
    test.ok(vector);
    test.equal(typeof vector, 'object');
    test.equal(vector.length(), 0);
    test.deepEqual(vector.elements(), [ ]);
    
    test.ok(predicates.isInteger(vector));
};

exports['create double vector with length 3'] = function (test) {
    const vector = vectors.double(3);
    
    test.ok(vector);
    test.equal(typeof vector, 'object');
    test.equal(vector.length(), 3);
    test.deepEqual(vector.elements(), [ 0.0, 0.0, 0.0 ]);
    
    // TODO add or not type to vectors?
    // test.ok(predicates.isDouble(vector));
};

exports['create double vector with length 3.9'] = function (test) {
    const vector = vectors.double(3.9);
    
    test.ok(vector);
    test.equal(typeof vector, 'object');
    test.equal(vector.length(), 3);
    test.deepEqual(vector.elements(), [ 0.0, 0.0, 0.0 ]);
    
    // TODO add or not type to vectors?
    //test.ok(predicates.isDouble(vector));
};

exports['create double vector with length 0'] = function (test) {
    const vector = vectors.double(0);
    
    test.ok(vector);
    test.equal(typeof vector, 'object');
    test.equal(vector.length(), 0);
    test.deepEqual(vector.elements(), [ ]);
    
    test.ok(predicates.isDouble(vector));
};

exports['create character vector with length 3'] = function (test) {
    const vector = vectors.character(3);
    
    test.ok(vector);
    test.equal(typeof vector, 'object');
    test.equal(vector.length(), 3);
    test.deepEqual(vector.elements(), [ '', '', '' ]);
    
    test.ok(predicates.isCharacter(vector));
};

exports['create character vector with length 3.9'] = function (test) {
    const vector = vectors.character(3.9);
    
    test.ok(vector);
    test.equal(typeof vector, 'object');
    test.equal(vector.length(), 3);
    test.deepEqual(vector.elements(), [ 0.0, 0.0, 0.0 ]);
    
    test.ok(predicates.isCharacter(vector));
};

exports['create character vector with length 0'] = function (test) {
    const vector = vectors.character(0);
    
    test.ok(vector);
    test.equal(typeof vector, 'object');
    test.equal(vector.length(), 0);
    test.deepEqual(vector.elements(), [ ]);
    
    test.ok(predicates.isCharacter(vector));
};

