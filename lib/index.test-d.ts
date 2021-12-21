import { hypostyle, HypostyleObject } from '.'
import * as presets from './presets'

// declare module '.' {
//   interface UserTheme {
//     tokens: {
//       color: {
//         primary: 'blue'
//       }
//     }
//   }
// }

const hypoObject: HypostyleObject = {
  color: { 0: 'blue' },
  figcaption: {
    c: 'primary',
  },
}

const hypo = hypostyle({
  ...presets,
  tokens: {
    color: {
      primary: 'blue',
    },
  },
  properties: {
    borderTopLeftRadius: {},
  },
})

const exploded = hypo.explode({
  c: 'blue',
})
const exploded2 = hypo.explode((theme) => ({
  c: theme.tokens.color.primary,
}))

const styled = hypo.style({
  c: 'blue',
})
const styled2 = hypo.style((theme) => ({
  c: theme.tokens.color.primary,
}))

const cn = hypo.css({
  c: 'blue',
})
const cn2 = hypo.css((theme) => ({
  c: theme.tokens.color.primary,
  mx: [2, 4],
}))
const cn3 = hypo.css({
  foobar: {},
  d: { 2: 'none' },
})

hypo.injectGlobal({
  html: {
    m: 0,
  },
})
