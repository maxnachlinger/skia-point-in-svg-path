'use strict';

const skiaPointInSvgPath = require('..');
const pointInSvgPath = require('point-in-svg-path');

const {points, paths} = require('./input');

// prepare input for point-in-svg-path
const pathDataStrings = paths.map(({data}) => data);
const pointInSvgPathInputs = points.reduce((acc, {x, y}) => acc.concat(
  pathDataStrings.map((d) => [d, x, y])
), []);

const inputSize = `(${points.length}) points, (${paths.length}) paths`;

console.time(`skia-point-in-svg-path: ${inputSize}`);
skiaPointInSvgPath(paths, points);
console.timeEnd(`skia-point-in-svg-path: ${inputSize}`);

// console.log(JSON.stringify(result, null, 2))
