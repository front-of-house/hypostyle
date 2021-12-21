const path = require('path')

const pkg = require('../package.json')

require('esbuild').buildSync({
  entryPoints: ['lib/index.ts', 'lib/presets.ts'],
  outdir: path.join(__dirname, '../'),
  bundle: true,
  minify: true,
  platform: 'node',
  target: 'es5',
  external: Object.keys(pkg.dependencies),
  logLevel: 'info',
})
