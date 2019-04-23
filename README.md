### skia-point-in-svg-path

### Install
```bash
npm i skia-point-in-svg-path
```

### Example
```javascript
const skiaPointInSvgPath = require('skia-point-in-svg-path')
  
skiaPointInSvgPath(
  [{ id: 'test-path', data: 'M80 80A 45 45, 0, 0, 0, 125 125L 125 80 Z' }], 
  [{ id: 'test-point', x: 100, y: 100 }]
) // [{intersectingPathIds: ['test-path'], pointId: 'test-point'}]
```
