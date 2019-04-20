
const operations = require('./operations');

const operfns = {
    '+': operations.add,
    '-': operations.subtract,
    '*': operations.multiply,
    '/': operations.divide,
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
}

module.exports = {
    process: function (node, context) { return (new Interpreter(context)).process(node); }
}