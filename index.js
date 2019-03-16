const lib = require('./build/Release/pointInSvgPath.node');

const validArray = (a) => a && Array.isArray(a) && a.length > 0;

const getPathsContainingPoints = (paths, points) => {
  if (!validArray(paths) || !validArray(points)) {
    throw new Error('Invalid input, array of path objects [{data: "", id: ""}] and point objects: [{id: "", x: 0, y: 0}] expected.');
  }
  return lib.getPathsContainingPoints(paths, points);
};

module.exports = getPathsContainingPoints;
