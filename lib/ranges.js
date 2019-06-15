
function Range(from, to) {
    let n = from;
    
    if (to < from)
        this.next = function () {
            if (n < to) {
                n = from;
                return null;
            }
            
            return n--;
        };
    else
        this.next = function () {
            if (n > to) {
                n = from;
                return null;
            }
            
            return n++;
        };
        
    this.elements = function () {
        const elements = [];
        
        for (let k = this.next(); k != null; k = this.next())
            elements.push(k);
        
        return elements;
    };
    
    this.length = function () {
        return this.elements().length;
    };
}

function createRange(from, to) {
    return new Range(from, to);
}

module.exports = {
    range: createRange
};

