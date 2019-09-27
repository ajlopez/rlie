
const parser = require('./parser');
const interpreter = require('./interpreter');
const contexts = require('./contexts');

function evaluate(text, context) {
    if (!context)
        context = contexts.top();
    
    const node = parser.parse('commands', text);
    
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

