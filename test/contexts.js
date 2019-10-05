
const contexts = require('../lib/contexts');

exports['get unknown variable'] = function (test) {
    const context = contexts.context();
    
    test.equal(context.get('foo'), null);
};

exports['set and get variable'] = function (test) {
    const context = contexts.context();
    
    context.set('answer', 42);
    
    test.equal(context.get('answer'), 42);
};

exports['set variable in parent and get variable in child context'] = function (test) {
    const parent = contexts.context();
    const context = contexts.context(parent);
    
    parent.set('answer', 42);
    
    test.equal(context.get('answer'), 42);
};

exports['top context cannot be changed only shadowed'] = function (test) {
    const top1 = contexts.top();
    
    top1.set('one', 1);
    
    const top2 = contexts.top();
    
    top2.set('two', 2);
    
    test.equal(top1.get('one'), 1);
    test.equal(top1.get('two'), null);
    test.equal(top2.get('one'), null);
    test.equal(top2.get('two'), 2);
};

