
const vectors = require('./vectors');
const ranges = require('./ranges');
const repetitions = require('./repetitions');
const operations = require('./operations');

const topcontext = createContext();

topcontext.set('c', function (args) { return vectors.vector(args); });
topcontext.set('seq', function (args) { return ranges.range(args[0], args[1]); });
topcontext.set('rep', function (args) { return repetitions.repetition(args[0], args[1]); });
topcontext.set('array', function (args) { return vectors.array(args[0], args[1]); });
topcontext.set('matrix', function (args) { return vectors.matrix(args[0], args[1], args[2]); });
topcontext.set('rbind', function (args) { return vectors.rbind(args); });
topcontext.set('cbind', function (args) { return vectors.cbind(args); });
topcontext.set('nrow', function (args) { return operations.nrow(args[0]); });
topcontext.set('ncol', function (args) { return operations.ncol(args[0]); });
topcontext.set('dim', function (args) { return operations.dim(args[0]); });
topcontext.set('sum', function (args) { return operations.sum(args[0]); });
topcontext.set('prod', function (args) { return operations.prod(args[0]); });
topcontext.set('length', function (args) { return operations.length(args[0]); });
topcontext.set('min', function (args) { return operations.min(args[0]); });
topcontext.set('max', function (args) { return operations.max(args[0]); });
topcontext.set('mean', function (args) { return operations.mean(args[0]); });
topcontext.set('var', function (args) { return operations.var(args[0]); });
topcontext.set('log', function (args) { return operations.log(args[0]); });
topcontext.set('exp', function (args) { return operations.exp(args[0]); });
topcontext.set('sqrt', function (args) { return operations.sqrt(args[0]); });
topcontext.set('abs', function (args) { return operations.abs(args[0]); });
topcontext.set('pi', Math.PI);
topcontext.set('sin', function (args) { return operations.sin(args[0]); });
topcontext.set('cos', function (args) { return operations.cos(args[0]); });
topcontext.set('tan', function (args) { return operations.tan(args[0]); });
topcontext.set('acos', function (args) { return operations.acos(args[0]); });
topcontext.set('atan', function (args) { return operations.atan(args[0]); });

function Context(parent) {
    const values = {};
    
    this.get = function (name) { if (values[name] === undefined && parent) return parent.get(name); else return values[name]; };
    this.set = function (name, value) { values[name] = value; };
}

function createContext(parent) {
    return new Context(parent);
}

module.exports = {
    context: createContext,
    top: function () { return topcontext; }
};

