
const parser = require('./parser');
const interpreter = require('./interpreter');
const contexts = require('./contexts');
const vectors = require('./vectors');
const operations = require('./operations');

const context = contexts.context();
context.set('c', function (args) { return vectors.vector(args); });
context.set('sum', function (args) { return operations.sum(args[0]); });

function evaluate(text) {
    const node = parser.parse('expression', text);
    return interpreter.process(node, context);
}

module.exports = {
    evaluate: evaluate
}