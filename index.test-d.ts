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
    }
  }
})

o.css(theme => ({
  c: theme.tokens.color.primary,
  mx: [2, 4]
}))
