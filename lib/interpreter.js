
const operations = require('./operations');

const operfns = {
    '+': operations.add,
    '-': operations.subtract,
    '*': operations.multiply,
    '/': operations.divide,
    '^': operations.power,
    
    '==': operations.equal,
    '!=': operations.notEqual,
    '<': operations.less,
    '<=': operations.lessEqual,
    '>': operations.greater,
    '>=': operations.greaterEqual,
};

function Interpreter(context) {
    this.process = function (node) {
        return node.process(this);
    };
    
    this.processConstant = function (node) {
        return node.value();
    };
    
    this.processName = function (node) {
        return context.get(node.name());
    };
    
    this.processBinary = function (node) {
        const oper = node.operator();
        const lvalue = this.process(node.left());
        const rvalue = this.process(node.right());
        
        return operfns[oper](lvalue, rvalue);
    };
    
    this.processCall = function (node) {
        const fn = this.process(node.target());
        const args = node.arguments();
        const values = [];
        
        for (let k = 0, l = args.length; k < l; k++)
            values.push(this.process(args[k]));
        
        return fn(values);
    };
}

module.exports = {
    process: function (node, context) { return (new Interpreter(context)).process(node); }
}