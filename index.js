const {getPointsAndIntersectingPaths} = require('./build/Release/pathsAndIntersectingPoints.node');

const validArray = (a) => a && Array.isArray(a) && a.length > 0;

module.exports = (paths, points) => {
  if (!validArray(paths) || !validArray(points)) {
    throw new Error('Invalid input, array of path objects [{data: "", id: ""}] and point objects: [{id: "", x: 0, y: 0}] expected.');
  }
  return getPointsAndIntersectingPaths(paths, points);
};
