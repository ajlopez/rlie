
const vectors = require('../lib/vectors');

exports['create matrix from native array'] = function (test) {
    const matrix = vectors.matrix([ 1, 2, 3, 4, 5, 6 ], 2, 3);
    
    test.ok(matrix);
    test.equal(matrix.length(), 6);
    test.deepEqual(matrix.elements(), [ 1, 2, 3, 4, 5, 6 ]);
    test.deepEqual(matrix.dimensions().elements(), [ 2, 3 ]);

    test.equal(matrix.get(1, 1), 1);
    test.equal(matrix.get(2, 1), 2);
    test.equal(matrix.get(1, 2), 3);
    test.equal(matrix.get(2, 2), 4);
    test.equal(matrix.get(1, 3), 5);
    test.equal(matrix.get(2, 3), 6);
};

