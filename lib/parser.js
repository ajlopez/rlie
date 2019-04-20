
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
pdef.define('expression', 'integer');
pdef.define('expression', 'real');
pdef.define('expression', 'string');
pdef.define('expression', 'logical');
pdef.define('expression', 'null');
pdef.define('expression', 'name');

function parseNode(type, text) {
    const lexer = lexers.lexer(text);
    const parser = pdef.parser(lexer);
    
    return parser.parse(type);
}

module.exports = {
    parse: parseNode
};



