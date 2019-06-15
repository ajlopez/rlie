
const vectors = require('./vectors');

function Repetition(value, times) {
    let n = 0;
    let elements = null;
    
    if (vectors.isVector(value))
        value = value.elements();
    
    if (Array.isArray(value))
        this.next = function () {
            if (n >= times) {
                n = 0;
                return null;
            }
            
            return value[n++ % value.length];
        };
    else
        this.next = function () {
            if (n >= times) {
                n = 0;
                return null;
            }
            
            n++;
            
            return value;
        };
        
    this.elements = function () {
        if (elements)
            return elements;
        
        elements = [];
        
        for (let k = this.next(); k != null; k = this.next())
            elements.push(k);
        
        return elements;
    };
    
    this.length = function () {
        return this.elements().length;
    };
}

function createRepetition(value, times) {
    return new Repetition(value, times);
}

module.exports = {
    repetition: createRepetition
}

