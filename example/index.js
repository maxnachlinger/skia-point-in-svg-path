'use strict'

const skiaPointInSvgPath = require('..')
const pointInSvgPath = require('point-in-svg-path')
const {generate} = require('./generate-large-input')
const smallInput = require('./input-small')

const processInputSkia = (input) => input.reduce((accum, {x, y, d}) => {
  if (!d) {
    return accum;
  }
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

const processInputJs = (input) => input.reduce((accum, {x, y, d}) => {
  if (!d) {
    return accum;
  }
  accum.checks++;
  if (pointInSvgPath(d, x, y)) {
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

console.time('Skia: Small input');
console.log(processInputSkia(smallInput));
console.timeEnd('Skia: Small input');

console.time('Js: Small input');
console.log(processInputJs(smallInput));
console.timeEnd('Js: Small input');

const largeInput = generate()

console.time('Skia: Large input');
console.log(processInputSkia(largeInput));
console.timeEnd('Skia: Large input');

console.time('Js: Large input');
console.log(processInputJs(largeInput));
console.timeEnd('Js: Large input');
