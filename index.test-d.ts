import { hypostyle } from '.'
import presets from './presets'

declare module '.' {
  interface UserTheme {
    tokens: {
      color: {
        primary: 'blue'
      }
    }
  }
}

const o = hypostyle({
  ...presets,
  tokens: {
    color: {
      primary: 'blue'
    },
  },
  properties: {
    borderTopLeftRadius: {}
  }
})

const exploded = o.explode({
  c: 'blue',
})
const exploded2 = o.explode(theme => ({
  c: theme.tokens.color.primary,
}))

const styled = o.style({
  c: 'blue'
})
const styled2 = o.style(theme => ({
  c: theme.tokens.color.primary,
}))

const cn = o.css({
  c: 'blue',
})
const cn2 = o.css(theme => ({
  c: theme.tokens.color.primary,
  mx: [2, 4]
}))
const cn3 = o.css({
  foobar: {
  },
  d: { 2: 'none' }
})

o.injectGlobal({
  html: {
    m: 0
  }
})
