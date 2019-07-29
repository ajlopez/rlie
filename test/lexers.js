
const lexers = require('../lib/lexers');
const TokenType = lexers.TokenType;

exports['create lexer as object'] = function (test) {
    const lexer = lexers.lexer('foo');
    
    test.ok(lexer);
    test.equal(typeof lexer, 'object');
};

exports['first token'] = function (test) {
    const lexer = lexers.lexer('foo');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'foo');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.next(), null);
};

exports['first token skipping line comment'] = function (test) {
    const lexer = lexers.lexer('# a comment\r\nfoo');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'foo');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.next(), null);
};

exports['no token in empty string'] = function (test) {
    const lexer = lexers.lexer('');
    
    test.equal(lexer.next(), null);
};

exports['name skipping spaces'] = function (test) {
    const lexer = lexers.lexer('  foo   ');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'foo');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.next(), null);
};

exports['two names'] = function (test) {
    const lexer = lexers.lexer('foo bar');
  
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'foo');
    test.equal(token.type, TokenType.Name);
  
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'bar');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.next(), null);
};

exports['integer'] = function (test) {
    const lexer = lexers.lexer('42');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '42');
    test.equal(token.type, TokenType.Integer);
    
    test.equal(lexer.next(), null);
};

exports['real'] = function (test) {
    const lexer = lexers.lexer('3.14159');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '3.14159');
    test.equal(token.type, TokenType.Real);
    
    test.equal(lexer.next(), null);
};

exports['comma as delimiter'] = function (test) {
    const lexer = lexers.lexer(',');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, ',');
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.next(), null);
};

exports['colon as delimiter'] = function (test) {
    const lexer = lexers.lexer(':');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, ':');
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.next(), null);
};

exports['parenthesis as delimiters'] = function (test) {
    const lexer = lexers.lexer('()');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '(');
    test.equal(token.type, TokenType.Delimiter);
    
    const token2 = lexer.next();
    
    test.ok(token2);
    test.equal(token2.value, ')');
    test.equal(token2.type, TokenType.Delimiter);
    
    test.equal(lexer.next(), null);
};

exports['dot as delimiter'] = function (test) {
    const lexer = lexers.lexer('.');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '.');
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.next(), null);
};

exports['name and delimiter'] = function (test) {
    const lexer = lexers.lexer('foo(');
  
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'foo');
    test.equal(token.type, TokenType.Name);
  
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '(');
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.next(), null);
};

exports['name starting with underscore'] = function (test) {
    const lexer = lexers.lexer('_foo');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '_foo');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.next(), null);
};

exports['name having underscore'] = function (test) {
    const lexer = lexers.lexer('foo_bar');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'foo_bar');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.next(), null);
};

exports['name having underscore and digits'] = function (test) {
    const lexer = lexers.lexer('foo_42');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'foo_42');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.next(), null);
};

exports['string in double quotes'] = function (test) {
    const lexer = lexers.lexer('"foo"');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'foo');
    test.equal(token.type, TokenType.String);
    
    test.equal(lexer.next(), null);
};

exports['string in single quotes'] = function (test) {
    const lexer = lexers.lexer("'foo'");
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'foo');
    test.equal(token.type, TokenType.String);
    
    test.equal(lexer.next(), null);
};

exports['string and name'] = function (test) {
    const lexer = lexers.lexer('"foo" bar');
  
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'foo');
    test.equal(token.type, TokenType.String);
  
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'bar');
    
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.next(), null);
};

exports['+ as operator'] = function (test) {
    const lexer = lexers.lexer('+');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '+');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.next(), null);
};

exports['= as operator'] = function (test) {
    const lexer = lexers.lexer('=');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '=');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.next(), null);
};

exports['{} as delimiters'] = function (test) {
    const lexer = lexers.lexer('{}');
  
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '{');
    test.equal(token.type, TokenType.Delimiter);
  
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '}');
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.next(), null);
};

exports['[] as delimiters'] = function (test) {
    const lexer = lexers.lexer('[]');
  
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '[');
    test.equal(token.type, TokenType.Delimiter);
  
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, ']');
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.next(), null);
};

exports['arithmetic operators'] = function (test) {
    const operators = '+-*/';
    const lexer = lexers.lexer(operators);
  
    for (var k = 0; k < operators.length; k++) {            
        const token = lexer.next();
        
        test.ok(token);
        test.equal(token.value, operators[k]);
        test.equal(token.type, TokenType.Operator);
    }
    
    test.equal(lexer.next(), null);
};

exports['assignment operators'] = function (test) {
    const operators = '= <- ->';
    const lexer = lexers.lexer(operators);
    const opers = operators.split(' ');
    
    for (var k = 0; k < opers.length; k++) {            
        const token = lexer.next();
        
        test.ok(token);
        test.equal(token.value, opers[k]);
        test.equal(token.type, TokenType.Operator);
    }
    
    test.equal(lexer.next(), null);
};

exports['modulus as operator'] = function (test) {
    const lexer = lexers.lexer('%%');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '%%');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.next(), null);
};

exports['integer division as operator'] = function (test) {
    const lexer = lexers.lexer('%/%');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '%/%');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.next(), null);
};

