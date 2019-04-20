
const lexers = require('./lexers');
const gepars = require('gepars');
const geast = require('geast');

const pdef = gepars.definition();

// constants

pdef.define('integer', 'integer:', function (value) { return geast.constant(parseInt(value)); });
pdef.define('real', 'real:', function (value) { return geast.constant(parseFloat(value)); });
pdef.define('string', 'string:', function (value) { return geast.constant(value); });
pdef.define('logical', 'name:TRUE', function (value) { return geast.constant(true); });
pdef.define('logical', 'name:FALSE', function (value) { return geast.constant(false); });
pdef.define('null', 'name:NULL', function (value) { return geast.constant(null); });
pdef.define('name', 'name:', function (value) { return geast.name(value); });

// expressions
pdef.define('expression', 'expression0');
pdef.define('expression0', [ 'expression0', 'binop0', 'expression1' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression0', 'expression1');
pdef.define('expression1', [ 'expression1', 'binop1', 'term' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression1', 'term');
pdef.define('binop0', 'operator:+');
pdef.define('binop0', 'operator:-');
pdef.define('binop1', 'operator:*');
pdef.define('binop1', 'operator:/');

// terms
pdef.define('term', 'integer');
pdef.define('term', 'real');
pdef.define('term', 'string');
pdef.define('term', 'logical');
pdef.define('term', 'null');
pdef.define('term', 'name');

function parseNode(type, text) {
    const lexer = lexers.lexer(text);
    const parser = pdef.parser(lexer);
    
    return parser.parse(type);
}

module.exports = {
    parse: parseNode
};



