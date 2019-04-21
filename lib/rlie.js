
const parser = require('./parser');
const interpreter = require('./interpreter');
const contexts = require('./contexts');
const vectors = require('./vectors');

const context = contexts.context();
context.set('c', function (args) { return vectors.vector(args); });

function evaluate(text) {
    const node = parser.parse('expression', text);
    return interpreter.process(node, context);
}

module.exports = {
    evaluate: evaluate
}