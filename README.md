### skia-point-in-svg-path

### Install
```bash
npm i skia-point-in-svg-path
```

### Example
```javascript
const skiaPointInSvgPath = require('skia-point-in-svg-path')

skiaPointInSvgPath(
  'M80 80A 45 45, 0, 0, 0, 125 125L 125 80 Z', 
  { x: 100, y: 100 }
) // true
```
