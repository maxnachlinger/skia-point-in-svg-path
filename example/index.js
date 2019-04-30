'use strict';

const skiaPointInSvgPath = require('..');
const {getPointsAndIntersectingPaths} = require('point-in-svg-path');

const {points, paths} = require('./input');
const inputSize = `(${points.length}) points, (${paths.length}) paths`;

console.time(`skia-point-in-svg-path: ${inputSize}`);
skiaPointInSvgPath(paths, points);
console.timeEnd(`skia-point-in-svg-path: ${inputSize}`);

// console.log(JSON.stringify(result, null, 2))
console.time(`point-in-svg-path: ${inputSize}`);
getPointsAndIntersectingPaths(paths, points);
console.timeEnd(`point-in-svg-path: ${inputSize}`);
