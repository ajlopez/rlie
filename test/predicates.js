
const predicates = require('../lib/predicates');
const vectors = require('../lib/vectors');

exports['is logical'] = function (test) {
    test.ok(predicates.isLogical(true));
    test.ok(predicates.isLogical(false));

    test.ok(!predicates.isLogical(1));
    test.ok(!predicates.isLogical("foo"));
    test.ok(!predicates.isLogical(null));
    test.ok(!predicates.isLogical(undefined));
    
    test.ok(predicates.isLogical(vectors.vector([ true, false ])));
    test.ok(predicates.isLogical(vectors.vector([ vectors.vector([ true, false ]) ])));
    
    test.ok(!predicates.isLogical(vectors.vector([ 1, false ])));
    test.ok(!predicates.isLogical(vectors.vector([ true, 2 ])));
};

exports['is integer'] = function (test) {
    test.ok(predicates.isInteger(1));
    
    test.ok(!predicates.isInteger(1.2));
    test.ok(!predicates.isInteger(true));
    test.ok(!predicates.isInteger(false));
    test.ok(!predicates.isInteger("foo"));
    test.ok(!predicates.isInteger(null));
    test.ok(!predicates.isInteger(undefined));

    test.ok(predicates.isInteger(vectors.vector([ 1, 2 ])));
    test.ok(predicates.isInteger(vectors.vector([ vectors.vector([ 1, 2 ]) ])));
    
    test.ok(!predicates.isInteger(vectors.vector([ 1, false ])));
    test.ok(!predicates.isInteger(vectors.vector([ 1, 2.5 ])));
    test.ok(!predicates.isInteger(vectors.vector([ "foo", 2 ])));
};

exports['is double'] = function (test) {
    test.ok(predicates.isDouble(1.2));
    
    test.ok(!predicates.isDouble(1));
    test.ok(!predicates.isDouble(true));
    test.ok(!predicates.isDouble(false));
    test.ok(!predicates.isDouble("foo"));
    test.ok(!predicates.isDouble(null));
    test.ok(!predicates.isDouble(undefined));
    
    test.ok(predicates.isDouble(vectors.vector([ 1.1, 2.2 ])));
    test.ok(predicates.isDouble(vectors.vector([ vectors.vector([ 1.1, 2.2 ]) ])));
    
    test.ok(!predicates.isDouble(vectors.vector([ 1, 2 ])));
    test.ok(!predicates.isDouble(vectors.vector([ 1.1, 2.0 ])));
    test.ok(!predicates.isDouble(vectors.vector([ 1.1, false ])));
    test.ok(!predicates.isDouble(vectors.vector([ 1, 2.5 ])));
    test.ok(!predicates.isDouble(vectors.vector([ "foo", 2 ])));
};

exports['is numeric'] = function (test) {
    test.ok(predicates.isNumeric(1));
    test.ok(predicates.isNumeric(1.2));
    
    test.ok(!predicates.isNumeric(true));
    test.ok(!predicates.isNumeric(false));
    test.ok(!predicates.isNumeric("foo"));
    test.ok(!predicates.isNumeric(null));
    test.ok(!predicates.isNumeric(undefined));

    test.ok(predicates.isNumeric(vectors.vector([ 1.1, 2.2 ])));
    test.ok(predicates.isNumeric(vectors.vector([ 1, 2 ])));
    test.ok(predicates.isNumeric(vectors.vector([ vectors.vector([ 1, 2.2 ]) ])));
    
    test.ok(!predicates.isNumeric(vectors.vector([ 1.1, false ])));
    test.ok(!predicates.isNumeric(vectors.vector([ null, 2.5 ])));
    test.ok(!predicates.isNumeric(vectors.vector([ "foo", 2 ])));
};

