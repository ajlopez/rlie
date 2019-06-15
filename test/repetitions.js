
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

