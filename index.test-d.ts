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

o.css(tokens => ({
  c: tokens.color.primary,
  mx: [2, 4]
}))
