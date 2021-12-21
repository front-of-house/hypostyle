const presets = require('../dist/presets')
const { hypostyle } = require('../dist')

const hypo = hypostyle(presets)

let pick = 0
let explode = 0
let css = 0
let total = 0

function process({ cx, ...rest }) {
  const t1 = Date.now()
  const cleaned = hypo.pick(rest)
  pick += Date.now() - t1

  const t2 = Date.now()
  const c = hypo.explode(cx)
  explode += Date.now() - t2

  const t3 = Date.now()
  hypo.style({
    ...cleaned.styles,
    ...c,
  })
  css += Date.now() - t3
}

const t4 = Date.now()
for (let i = 0; i < 100000; i++) {
  process({
    cx: {
      p: i + 'px',
      border: `${i}px solid blue`,
      d: 'block',
      f: true,
      aic: true,
      bg: 'tomato',
    },
    className: 'foo',
    m: [i + 'px', 2],
    d: { 0: 'block', 1: 'flex' },
    px: [1, 2, 3, 4, 5],
  })
}
total += Date.now() - t4

console.log({ pick, explode, css, total })
