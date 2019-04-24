### skia-point-in-svg-path
> Uses the SKIA C 2-d graphics library to determine if a given point is within a closed SVG path.

### Install
```bash
npm i skia-point-in-svg-path
```

### Example
```javascript
const getPathsAndIntersectingPoints = require('skia-point-in-svg-path')
  
const results = getPathsAndIntersectingPoints(
  [{ id: 'test-path', data: 'M80 80A 45 45, 0, 0, 0, 125 125L 125 80 Z' }], 
  [{ id: 'test-point', x: 100, y: 100 }, { id: 'test-point', x:750, y: 500 }]
);

console.log(results);
/*
[ { pointId: 'test-point',
    x: 100,
    y: 100,
    intersectingPathIds: [ 'test-path' ] },
  { pointId: 'test-point', x: 750, y: 500, intersectingPathIds: [] } ]
*/
```

### Why?
Determining if a point falls withing an arbitrary, closed, SVG path is difficult and I'd rather use a well-tested graphics library to determine that :) 
