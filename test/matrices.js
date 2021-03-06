
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

exports['create matrix from vector without specifying rows and columns'] = function (test) {
    const matrix = vectors.matrix(vectors.vector([ 1, 2, 3, 4, 5, 6 ]));
    
    test.ok(matrix);
    test.equal(matrix.length(), 6);
    test.deepEqual(matrix.elements(), [ 1, 2, 3, 4, 5, 6 ]);
    test.deepEqual(matrix.dimensions().elements(), [ 6, 1 ]);

    test.equal(matrix.get(1, 1), 1);
    test.equal(matrix.get(2, 1), 2);
    test.equal(matrix.get(3, 1), 3);
    test.equal(matrix.get(4, 1), 4);
    test.equal(matrix.get(5, 1), 5);
    test.equal(matrix.get(6, 1), 6);
};

exports['create matrix from vector without specifying columns'] = function (test) {
    const matrix = vectors.matrix(vectors.vector([ 1, 2, 3, 4, 5, 6 ]), 2);
    
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

exports['create matrix from vector without specifying columns and repeating values'] = function (test) {
    const matrix = vectors.matrix(vectors.vector([ 1, 2, 3, 4, 5, 6 ]), 4);
    
    test.ok(matrix);
    test.equal(matrix.length(), 8);
    test.deepEqual(matrix.elements(), [ 1, 2, 3, 4, 5, 6, 1, 2 ]);
    test.deepEqual(matrix.dimensions().elements(), [ 4, 2 ]);

    test.equal(matrix.get(1, 1), 1);
    test.equal(matrix.get(2, 1), 2);
    test.equal(matrix.get(3, 1), 3);
    test.equal(matrix.get(4, 1), 4);
    test.equal(matrix.get(1, 2), 5);
    test.equal(matrix.get(2, 2), 6);
    test.equal(matrix.get(3, 2), 1);
    test.equal(matrix.get(4, 2), 2);
};

exports['create matrix using native array rows'] = function (test) {
    const matrix = vectors.rbind([ [ 1, 2, 3 ], [ 4, 5, 6 ] ]);
    
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

exports['create matrix using native array rows with different lenghts'] = function (test) {
    const matrix = vectors.rbind([ [ 1, 2 ], [ 4, 5, 6 ] ]);
    
    test.ok(matrix);
    test.equal(matrix.length(), 6);
    test.deepEqual(matrix.elements(), [ 1, 2, 1, 4, 5, 6 ]);
    test.deepEqual(matrix.dimensions().elements(), [ 2, 3 ]);

    test.equal(matrix.get(1, 1), 1);
    test.equal(matrix.get(2, 1), 2);
    test.equal(matrix.get(1, 2), 1);
    test.equal(matrix.get(2, 2), 4);
    test.equal(matrix.get(1, 3), 5);
    test.equal(matrix.get(2, 3), 6);
};

exports['create matrix using vector rows'] = function (test) {
    const matrix = vectors.rbind([ vectors.vector([ 1, 2, 3 ]), vectors.vector([ 4, 5, 6 ]) ]);
    
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

exports['create matrix using native array columns'] = function (test) {
    const matrix = vectors.cbind([ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]);
    
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

exports['create matrix using native array columns with different lenghts'] = function (test) {
    const matrix = vectors.cbind([ [ 1, 4 ], [ 2, 5 ], [ 3 ] ]);
    
    test.ok(matrix);
    test.equal(matrix.length(), 6);
    test.deepEqual(matrix.elements(), [ 1, 2, 3, 4, 5, 3 ]);
    test.deepEqual(matrix.dimensions().elements(), [ 2, 3 ]);

    test.equal(matrix.get(1, 1), 1);
    test.equal(matrix.get(2, 1), 2);
    test.equal(matrix.get(1, 2), 3);
    test.equal(matrix.get(2, 2), 4);
    test.equal(matrix.get(1, 3), 5);
    test.equal(matrix.get(2, 3), 3);
};

exports['create matrix using vector columns'] = function (test) {
    const matrix = vectors.cbind([ vectors.vector([ 1, 4 ]), vectors.vector([ 2, 5 ]), vectors.vector([ 3, 6 ]) ]);
    
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

exports['get matrix elements using null index'] = function (test) {
    const matrix = vectors.matrix([ 1, 2, 3, 4, 5, 6 ], 2, 3);
    
    test.ok(matrix);
    test.equal(matrix.length(), 6);
    test.deepEqual(matrix.elements(), [ 1, 2, 3, 4, 5, 6 ]);
    test.deepEqual(matrix.dimensions().elements(), [ 2, 3 ]);

    test.deepEqual(matrix.get(1, null).elements(), [ 1, 3, 5 ]);
    test.deepEqual(matrix.get(2, null).elements(), [ 2, 4, 6 ]);
    test.deepEqual(matrix.get(null, 1).elements(), [ 1, 2 ]);
    test.deepEqual(matrix.get(null, 2).elements(), [ 3, 4 ]);
    test.deepEqual(matrix.get(null, 3).elements(), [ 5, 6 ]);
};

exports['get slices'] = function (test) {
    const matrix = vectors.matrix([ 1, 2, 3, 4, 5, 6 ], 2, 3);
    
    test.deepEqual(matrix.slice(1, 1).elements(), [ 1, 3, 5 ]);
    test.deepEqual(matrix.slice(1, 2).elements(), [ 2, 4, 6 ]);
    test.deepEqual(matrix.slice(2, 1).elements(), [ 1, 2 ]);
    test.deepEqual(matrix.slice(2, 2).elements(), [ 3, 4 ]);
    test.deepEqual(matrix.slice(2, 3).elements(), [ 5, 6 ]);
};

