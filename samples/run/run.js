
const rlie = require('../..');
const fs = require('fs');

const filename = process.argv[2];
const code = fs.readFileSync(filename).toString();

const result = rlie.evaluate(code);

if (result && typeof result.elements === 'function')
    console.dir(result.elements());
else if (Array.isArray(result)) {
    for (let k = 0, l = result.length; k < l; k++)
        if (result[k] && typeof result[k].elements === 'function')
            console.dir(result[k].elements());
        else
            console.log(result[k]);
}
else
    console.log(result);

