
function Interpreter() {
    this.process = function (node) {
        return node.process(this);
    };
    
    this.processConstant = function (node) {
        return node.value();
    };
}

module.exports = {
    process: function (node) { return (new Interpreter()).process(node); }
}