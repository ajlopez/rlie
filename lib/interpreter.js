
const contexts = require('./contexts');
const operations = require('./operations');

const unaryFns = {
    '-': operations.minus,
    '!': operations.not
};

const binaryFns = {
    '+': operations.add,
    '-': operations.subtract,
    '*': operations.multiply,
    '/': operations.divide,
    '%%': operations.mod,
    '%/%': operations.integerDivide,
    '^': operations.power,
    '|': operations.or,
    '&': operations.and,
    
    '==': operations.equal,
    '!=': operations.notEqual,
    '<': operations.less,
    '<=': operations.lessEqual,
    '>': operations.greater,
    '>=': operations.greaterEqual,
};

function XFunction(argnames, body, context) {
    const nargs = argnames.length;
    
    this.execute = function (args) {
        const newcontext = contexts.context(context);
        
        for (let k = 0; k < nargs; k++)
            newcontext.set(argnames[k], args[k]);
        
        const interpreter = new Interpreter(newcontext);
        
        return interpreter.process(body);
    };
}

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
    
    this.processUnary = function (node) {
        const oper = node.operator();
        const value = this.process(node.expression());
        
        return unaryFns[oper](value);
    };
    
    this.processAssign = function (node) {
        const name = node.lefthand().name();        
        const value = this.process(node.expression());
        
        context.set(name, value);
        
        return value;
    };
    
    this.processBinary = function (node) {
        const oper = node.operator();
        const lvalue = this.process(node.left());
        const rvalue = this.process(node.right());
        
        return binaryFns[oper](lvalue, rvalue);
    };
    
    this.processIndexed = function (node) {
        const target = this.process(node.target());
        const indexes = [];
        const index = node.index();
        
        for (let k = 0, l = index.length; k < l; k ++)
            indexes.push(this.process(index[k]));
        
        return target.get.apply(target, indexes);
    };
    
    this.processCall = function (node) {
        const fn = this.process(node.target());
        const args = node.arguments();
        const values = [];
        
        for (let k = 0, l = args.length; k < l; k++)
            values.push(this.process(args[k]));

        if (fn.execute && typeof fn.execute === 'function')
            return fn.execute(values);
        else
            return fn(values);
    };
    
    this.processSequence = function (node) {
        const nodes = node.nodes();
        let value = null;
        
        for (let k = 0, l = nodes.length; k < l; k++)
            value = this.process(nodes[k]);
        
        return value;
    };
    
    this.processFunction = function (node) {
        return new XFunction(node.arguments(), node.body(), context);
    };
}

module.exports = {
    process: function (node, context) { return (new Interpreter(context)).process(node); }
}

