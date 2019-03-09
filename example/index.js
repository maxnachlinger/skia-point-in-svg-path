'use strict'

const skiaPointInSvgPath = require('..')
const smallInput = require('./input-small')

const processInput = (input) => input.reduce((accum, {x, y, d}) => {
  accum.checks++;
  if (skiaPointInSvgPath(d, {x, y})) {
    accum.hits++;
  } else {
    accum.misses++;
  }
  return accum;
}, {
  checks: 0,
  hits: 0,
  misses: 0,
});

console.time('Small input');
console.log(processInput(smallInput));
console.timeEnd('Small input');
