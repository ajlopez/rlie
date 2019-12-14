
const parser = require('../lib/parser');
const interpreter = require('../lib/interpreter');
const contexts = require('../lib/contexts');

exports['process named expression'] = function (test) {
    const expression = parser.parse('nexpression', 'answer=42');
    
    test.ok(expression);
    test.equal(expression.ntype(), 'named');
    test.ok(expression.expression());
    test.equal(expression.expression().ntype(), 'constant');
    test.equal(expression.expression().value(), 42);
    
    const result = interpreter.process(expression, contexts.top());
    
    test.ok(result);
    test.equal(result.value(), 42);  
};

