
const repetitions = require('../lib/repetitions');
const vectors = require('../lib/vectors');

exports['create repetition with 1 value repeated 3 times'] = function (test) {
    const rep = repetitions.repetition(42, 3);
    
    test.ok(rep);
    test.equal(rep.next(), 42);
    test.equal(rep.next(), 42);
    test.equal(rep.next(), 42);
    test.equal(rep.next(), null);
};

exports['repetition length'] = function (test) {
    const rep = repetitions.repetition(42, 3);
    
    test.ok(rep);
    test.equal(rep.length(), 3);
};

exports['repetition elements'] = function (test) {
    const rep = repetitions.repetition(42, 3);
    
    test.ok(rep);
    test.deepEqual(rep.elements(), [ 42, 42, 42 ]);
};

exports['retrieve repetition values twice'] = function (test) {
    const rep = repetitions.repetition(42, 3);
    
    test.ok(rep);
    
    test.equal(rep.next(), 42);
    test.equal(rep.next(), 42);
    test.equal(rep.next(), 42);
    test.equal(rep.next(), null);
    
    test.equal(rep.next(), 42);
    test.equal(rep.next(), 42);
    test.equal(rep.next(), 42);
    test.equal(rep.next(), null);
};

exports['create repetition with array'] = function (test) {
    const rep = repetitions.repetition([ 1, 4, 9 ], 5);
    
    test.ok(rep);
    test.equal(rep.next(), 1);
    test.equal(rep.next(), 4);
    test.equal(rep.next(), 9);
    test.equal(rep.next(), 1);
    test.equal(rep.next(), 4);
    test.equal(rep.next(), null);
};

exports['retrieve repetition values with array twice'] = function (test) {
    const rep = repetitions.repetition([ 1, 4, 9 ], 5);
    
    test.ok(rep);
    test.equal(rep.next(), 1);
    test.equal(rep.next(), 4);
    test.equal(rep.next(), 9);
    test.equal(rep.next(), 1);
    test.equal(rep.next(), 4);
    test.equal(rep.next(), null);
    test.equal(rep.next(), 1);
    test.equal(rep.next(), 4);
    test.equal(rep.next(), 9);
    test.equal(rep.next(), 1);
    test.equal(rep.next(), 4);
    test.equal(rep.next(), null);
};

exports['create repetition with vector'] = function (test) {
    const rep = repetitions.repetition(vectors.vector([ 1, 4, 9 ]), 5);
    
    test.ok(rep);
    test.equal(rep.next(), 1);
    test.equal(rep.next(), 4);
    test.equal(rep.next(), 9);
    test.equal(rep.next(), 1);
    test.equal(rep.next(), 4);
    test.equal(rep.next(), null);
};

