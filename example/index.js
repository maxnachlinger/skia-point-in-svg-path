'use strict';

const skiaPointInSvgPath = require('..');
const {points, paths} = require('./input');

const label = `(${points.length}) points, (${paths.length}) paths`;
console.time(label);
const result = skiaPointInSvgPath(paths, points);
console.timeEnd(label);
// console.log(JSON.stringify(result, null, 2))
