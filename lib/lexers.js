
const gelex = require('gelex');

const ldef = gelex.definition();

ldef.define('name', '[a-zA-Z_][a-zA-Z0-9_@]*');
ldef.define('real', '[0-9][0-9]*.[0-9][0-9]*');
ldef.define('integer', '[0-9][0-9]*');
ldef.define('delimiter', ',().{}[]'.split(''));
ldef.define('operator', '<- -> == != >= <='.split(' '));
ldef.define('operator', '=+-*/^><'.split(''));
ldef.defineText('string', '"', '"');
ldef.defineText('string', "'", "'");

const TokenType = { Name: 'name', Integer: 'integer', Real: 'real', String: 'string', Operator: 'operator', Delimiter: 'delimiter' };

function createLexer(text) {
    return ldef.lexer(text);
}

module.exports = {
    lexer: createLexer,
    TokenType: TokenType
}
