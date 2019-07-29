# Rlie

R-like interpreter in JavaScript. WIP.

## Install

Run
```
npm instal rlie
```

## Usage

```
const rlie = require('rlie');
const vector = rlie.evaluate('c(1, 2, 3)');
console.dir(vector.elements());
```

## Version

- 0.0.1 Published, simple evaluate, first sample

## References

- [An Introduction to R](https://cran.r-project.org/doc/manuals/r-release/R-intro.html)
- [Run R code online](https://rdrr.io/snippets/)
- [How Can I Wait In Node.js (Javascript), l need to pause for a period of time](https://stackoverflow.com/questions/14249506/how-can-i-wait-in-node-js-javascript-l-need-to-pause-for-a-period-of-time)
- [What's the Big Deal with Generators?](http://devsmash.com/blog/whats-the-big-deal-with-generators)
- [R Matrix](https://www.datamentor.io/r-programming/matrix/)
- [Purr Tutorial](https://jennybc.github.io/purrr-tutorial/)
- [R Programming](https://www.tutorialgateway.org/r-programming/)

## To Do

- Sort operations on vectors
- Trigonometric operations
- Matrix support
- Index vectors
- Logical vectors coarse to numbers in arithmetic operations

## Contribution

Feel free to [file issues](https://github.com/ajlopez/rlie) and submit
[pull requests](https://github.com/ajlopez/rlie/pulls) — contributions are
welcome.

If you submit a pull request, please be sure to add or update corresponding
test cases, and ensure that `npm test` continues to pass.

