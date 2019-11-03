
const vectors = require('./vectors');

function predicate(fn) {
    const xfn = function (value) {
        if (fn(value))
            return true;
        
        if (vectors.isVector(value)) {
            const elems = value.elements();
            
            for (let k = 0, l = elems.length; k < l; k++)
                if (!xfn(elems[k]))
                    return false;
                
            return true;
        }
        
        return false;
    }
    
    return xfn;
}

module.exports = {
    isLogical: predicate(value => typeof value === 'boolean'),
    isNumeric: predicate(value => typeof value === 'number'),
    isInteger: predicate(value => typeof value === 'number' && Number.isInteger(value)),
    isDouble: predicate(value => typeof value === 'number' && !Number.isInteger(value)),
    isCharacter: predicate(value => typeof value === 'string'),
};

