const pointInSvgPath = require('./build/Release/pointInSvgPath.node');

const contains = (pathString, point) => {
  if (!pathString
    || typeof pathString !== 'string'
    || !point
    || !point.hasOwnProperty('x')
    || typeof point.x !== 'number'
    || !point.hasOwnProperty('y')
    || typeof point.y !== 'number'
  ) {
    throw new Error('Invalid input, pathString and point object of the form {x: 0, y: 0} expected.');
  }
  return pointInSvgPath.contains(pathString, point.x, point.y);
};

module.exports = contains;
