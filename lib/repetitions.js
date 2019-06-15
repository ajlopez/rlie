
const vectors = require('./vectors');

function Repetition(value, times) {
    let n = 0;
    
    if (vectors.isVector(value))
        value = value.elements();
    
    if (Array.isArray(value))
        this.next = function () {
            if (n >= times)
                return null;
            
            return value[n++ % value.length];
        }
    else
        this.next = function () {
            if (n >= times)
                return null;
            
            n++;
            
            return value;
        }
}

function createRepetition(value, times) {
    return new Repetition(value, times);
}

module.exports = {
    repetition: createRepetition
}

