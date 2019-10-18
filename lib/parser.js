
const lexers = require('./lexers');
const gepars = require('gepars');
const geast = require('geast');

geast.node('range', [ 'from', 'to' ]);
geast.node('function', [ 'arguments', 'body' ]);
geast.node('named', [ 'name', 'expression' ]);

const pdef = gepars.definition();

// constants

pdef.define('integer', 'integer:', function (value) { return geast.constant(parseInt(value)); });
pdef.define('real', 'real:', function (value) { return geast.constant(parseFloat(value)); });
pdef.define('string', 'string:', function (value) { return geast.constant(value); });
pdef.define('logical', 'name:TRUE', function (value) { return geast.constant(true); });
pdef.define('logical', 'name:FALSE', function (value) { return geast.constant(false); });
pdef.define('null', 'name:NULL', function (value) { return geast.constant(null); });
pdef.define('name', 'name:', function (value) { return geast.name(value); });

// commands
pdef.define('commands', 'command', function (value) { return [ value ]; });
pdef.define('commands', [ '!', 'null' ], function (value) { return []; });
pdef.define('commands', [ 'commands', 'command' ], function (values) { values[0].push(values[1]); return values[0]; });
pdef.define('command', [ 'delimiter:{', 'commands', 'delimiter:}' ], function (values) { return geast.sequence(values[1]); });
pdef.define('command', [ 'expression', 'eoc' ], function (values) { return values[0]; });
pdef.define('eoc', 'char:\n');
pdef.define('eoc', 'delimiter:;');
pdef.define('eoc', [ '!', 'delimiter:}' ]);
pdef.define('eoc', [ '!', 'null' ]);

// expressions
pdef.define('expression', 'function');
pdef.define('expression', [ 'name', 'operator:<-', 'expression' ], function (values) { return geast.assign(values[0], values[2]); });
pdef.define('expression', 'expressionl0');
pdef.define('expression', [ 'expression', 'operator:->', 'name' ], function (values) { return geast.assign(values[2], values[0]); });

pdef.define('function', [ 'name:function', 'delimiter:(', 'namelist', 'delimiter:)', 'command' ], function (values) { return geast.function(values[2], values[4]); });
pdef.define('namelist', [ '!', 'delimiter:)' ], function (values) { return []; });
pdef.define('namelist', [ 'name:', '!', 'delimiter:)' ], function (values) { return [ values[0] ]; });
pdef.define('namelist', [ 'name:', 'delimiter:,', 'namelist' ], function (values) { values[2].unshift(values[0]); return values[2]; });

pdef.define('expressionl0', 'expressionl1');
pdef.define('expressionl0', [ 'expressionl0', 'binopl0', 'expressionl1' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expressionl1', 'expression0');
pdef.define('expressionl1', [ 'expressionl1', 'binopl1', 'expression0' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression0', 'expression1');
pdef.define('expression0', [ 'expression0', 'binop0', 'expression1' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression1', 'expression2');
pdef.define('expression1', [ 'expression1', 'binop1', 'expression2' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression2', 'expression3');
pdef.define('expression2', [ 'expression2', 'binop2', 'expression3' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression3', 'term');
pdef.define('expression3', [ 'expression3', 'binop3', 'term' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('binopl0', 'operator:|');
pdef.define('binopl0', 'operator:||');
pdef.define('binopl1', 'operator:&');
pdef.define('binopl1', 'operator:&&');
pdef.define('binop0', 'operator:<');
pdef.define('binop0', 'operator:>');
pdef.define('binop0', 'operator:<=');
pdef.define('binop0', 'operator:>=');
pdef.define('binop0', 'operator:==');
pdef.define('binop0', 'operator:!=');
pdef.define('binop1', 'operator:+');
pdef.define('binop1', 'operator:-');
pdef.define('binop2', 'operator:*');
pdef.define('binop2', 'operator:/');
pdef.define('binop2', 'operator:%%');
pdef.define('binop2', 'operator:%/%');
pdef.define('binop3', 'operator:^');

// terms
pdef.define('term', [ 'operator:-', 'term' ], function (values) { return geast.unary(values[0], values[1]); });
pdef.define('term', [ 'operator:!', 'term' ], function (values) { return geast.unary(values[0], values[1]); });
pdef.define('term', [ 'term', 'delimiter:(', 'exprlist', 'delimiter:)' ], function (values) { return geast.call(values[0], values[2]); });
pdef.define('term', [ 'term', 'delimiter:[', 'xexprlist', 'delimiter:]' ], function (values) { return geast.indexed(values[0], values[2]); });
pdef.define('term', [ 'term', 'delimiter::', 'term' ], function (values) { return geast.range(values[0], values[2]); });
pdef.define('term', [ 'term', 'delimiter:.', 'name:' ], function (values) { return geast.property(values[0], values[2]); });

pdef.define('exprlist', [ '!', 'delimiter:)' ], function (values) { return []; });
pdef.define('exprlist', 'nexpression', function (value) { return [ value ]; });
pdef.define('exprlist', [ 'exprlist', 'delimiter:,', 'nexpression' ], function (values) { values[0].push(values[2]); return values[0]; });
pdef.define('nexpression', [ 'name:', 'operator:=', 'expression' ], function (values) { return geast.named(values[0], values[2]); });
pdef.define('nexpression', 'expression');

pdef.define('xexprlist', [ '!', 'delimiter:]' ], function (values) { return []; });
pdef.define('xexprlist', 'xexpression', function (value) { return [ value ]; });
pdef.define('xexprlist', [ 'xexprlist', 'delimiter:,', 'xexpression' ], function (values) { values[0].push(values[2]); return values[0]; });
pdef.define('xexpression', [ '!', 'delimiter:,' ], function (values) { return geast.constant(null); });
pdef.define('xexpression', [ '!', 'delimiter:]' ], function (values) { return geast.constant(null); });
pdef.define('xexpression', 'expression');

pdef.define('term', 'integer');
pdef.define('term', 'real');
pdef.define('term', 'string');
pdef.define('term', 'logical');
pdef.define('term', 'null');
pdef.define('term', 'name');
pdef.define('term', [ 'delimiter:(', 'expression', 'delimiter:)' ], function (values) { return values[1]; });

function parseNode(type, text) {
    const lexer = lexers.lexer(text);
    const parser = pdef.parser(lexer);
    
    return parser.parse(type);
}

module.exports = {
    parse: parseNode
};



