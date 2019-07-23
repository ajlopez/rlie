
function Vector(elems) {
    let elements = [];
    
    for (let k = 0, l = elems.length; k < l; k++) {
        const elem = elems[k];
        
        if (typeof elem.elements === 'function')
            elements = elements.concat(elem.elements());
        else
            elements.push(elem);
    }
        
    this.elements = function () { return elements; };
    this.length = function () { return elements.length; };
    
    // TODO return NA if index >= elements.length
    this.get = function (index) { 
        if (Array.isArray(index)) {
            const elems = [];
            
            for (let k = 0, l = index.length; k < l; k++)
                elems.push(this.get(index[k]));
            
            return createVector(elems);
        }
        
        if (index > 0)
            return elements[index - 1]; 
        
        if (index < 0) {
            const elems = [];
            
            for (let k = 0, l = elements.length; k < l; k++)
                if (-index !== k + 1)
                    elems.push(elements[k]);
                
            return createVector(elems);
        }
        
        if (index === 0)
            return createVector([]);
    };
}

function VectorArray(elems, dims) {
    Vector.call(this, elems);
    
    if (Array.isArray(dims))
        dims = new Vector(dims);
    
    const edims = dims.elements();
    const ndims = edims.length;
    
    this.dimensions = function () { return dims; };

    function enumDim(ndim) {
        const result = [];
        
        for (let k = 1, l = edims[ndim]; k <= l; k++)
            result.push(k);
        
        return result;
    }
    
    function normalizeIndexes(indexes) {
        const result = [];
        
        for (let k = 0, l = indexes.length; k < l; k++) {
            const index = indexes[k];
            
            if (index == null)
                result.push(enumDim(k));
            else if (typeof index.elements === 'function')
                result.push(index.elements());
            else
                result.push(index);
        }
        
        return result;
    }
    
    this.get = function () {
        let indexes = normalizeIndexes(arguments);
        let index = 0;
        let mult = 1;
        
        for (let k = 0; k < ndims; k++) {
            index += (indexes[k] - 1) * mult;
            mult *= edims[k];
        }
        
        return this.elements()[index];
    };
    
    // TODO manage more than 2 dimensions
    this.slice = function (ndim, nslice) {
        const result = [];
        
        if (ndim === 1)
            for (let k = 1; k <= edims[1]; k++)
                result.push(this.get(nslice, k));
        else if (ndim === 2)
            for (let k = 1; k <= edims[0]; k++)
                result.push(this.get(k, nslice));
            
        return createVector(result);
    };
}

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance

VectorArray.prototype = Object.create(Vector.prototype);
VectorArray.prototype.constructor = VectorArray;

function createVector(elems) {
    return new Vector(elems);
}

function isVector(value) {
    return value instanceof Vector;
}

function isArray(value) {
    return value instanceof VectorArray;
}

function resizeElements(elems, newsize) {
    const newelems = [];
    
    for (let k = 0, l = elems.length; k < newsize; k++)
        if (l === 0)
            newelems[k] = 0;
        else
            newelems[k] = elems[k % l];
    
    return newelems;
}

function resizeVector(vector, newsize) {
    const elems = vector.elements();
    
    return new Vector(resizeElements(elems, newsize));
}

function createArray(elems, dims) {
    if (elems instanceof Vector)
        elems = elems.elements();
    
    if (dims instanceof Vector)
        dims = dims.elements();
    
    if (dims[0] == null && dims[1] == null) {
        dims[0] = elems.length;
        dims[1] = 1;
    }
    
    let prod = 1;
    
    for (let k = 0, l = dims.length; k < l; k++)
        prod *= dims[k];
    
    if (prod !== elems.length)
        elems = resizeElements(elems, prod);
    
    return new VectorArray(elems, dims);
}

function createMatrix(elems, nrows, ncols) {
    return createArray(elems, [ nrows, ncols ]);
}

function bindRows(rows) {
    let lrow = 0;
    
    for (let k = 0, n = rows.length; k < n; k++) {
        if (rows[k] && typeof rows[k].elements === 'function')
            rows[k] = rows[k].elements();
        
        if (rows[k].length > lrow)
            lrow = rows[k].length;
    }
    
    for (let k = 0, l = rows.length; k < l; k++)
        if (rows[k].length < lrow)
            rows[k] = resizeElements(rows[k], lrow);
        
    let elements = [];
    
    for (let k = 0, l = rows.length; k < l; k++)
        elements = elements.concat(rows[k]);
    
    return createMatrix(elements, rows.length, lrow);
}

function bindColumns(columns) {
    let lcolumn = 0;
    
    for (let k = 0, n = columns.length; k < n; k++) {
        if (columns[k] && typeof columns[k].elements === 'function')
            columns[k] = columns[k].elements();
        
        if (columns[k].length > lcolumn)
            lcolumn = columns[k].length;
    }
    
    for (let k = 0, l = columns.length; k < l; k++)
        if (columns[k].length < lcolumn)
            columns[k] = resizeElements(columns[k], lcolumn);
        
    let elements = [];
    
    for (let j = 0; j < lcolumn; j++)
        for (let k = 0, l = columns.length; k < l; k++)
            elements.push(columns[k][j]);
    
    return createMatrix(elements, lcolumn, columns.length);
}

module.exports = {
    vector: createVector,
    isVector: isVector,
    resize: resizeVector,
    
    array: createArray,
    isArray: isArray,
    
    matrix: createMatrix,
    rbind: bindRows,
    cbind: bindColumns
};

