
const parser = require('./parser');
const interpreter = require('./interpreter');
const contexts = require('./contexts');
const vectors = require('./vectors');
const operations = require('./operations');

const context = contexts.context();
context.set('c', function (args) { return vectors.vector(args); });
context.set('sum', function (args) { return operations.sum(args[0]); });
context.set('prod', function (args) { return operations.prod(args[0]); });
context.set('length', function (args) { return operations.length(args[0]); });
context.set('min', function (args) { return operations.min(args[0]); });
context.set('max', function (args) { return operations.max(args[0]); });
context.set('mean', function (args) { return operations.mean(args[0]); });
context.set('var', function (args) { return operations.var(args[0]); });

function evaluate(text) {
    const node = parser.parse('expressions', text);
    
    if (Array.isArray(node)) {
        const result = [];
        
        for (let k = 0, l = node.length; k < l; k++)
            result.push(interpreter.process(node[k], context));
 
        if (result.length === 1)
            return result[0];
        
        return result;
    }
    
    return interpreter.process(node, context);
}

module.exports = {
    evaluate: evaluate
}