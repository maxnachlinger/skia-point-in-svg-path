### skia-point-in-svg-path
> Note: This module isn't quite ready for production use yet.

#### Why
I'd like to use Skia to calculate if a point within a non-closed SVG path.
This isn't a trivial calculation :(

#### Build / Install
This downloads the Skia src, but uses prebuilt libs. Building Skia takes an age, so this helps that.
```bash
npm i skia-point-in-svg-path
```

#### Test
```bash
npm t
```

#### Example app
[Have a look here](./example).

#### TODO
- Create some kind of universal binary for Linux
- Windows binaries / support
