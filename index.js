import { mapping } from './lib/mapping'
import { theme as defaultTheme } from './lib/theme'
import { shorthands as defaultShorthands } from './lib/shorthands'

function mergeTheme ({ variants, shorthands, ...theme }) {
  return {
    ...defaultTheme,
    ...theme,
    variants: variants || {},
    shorthands: Object.assign({}, defaultShorthands, shorthands || {})
  }
}

function process (style, theme) {
  const styles = {}

  for (const prop of Object.keys(style)) {
    // if rules is undefined, the prop is some normie CSS prop
    const { rules = [prop], scale, unit } = mapping[prop] || {}
    const themeScale = theme[scale]
    const rawValue = style[prop]

    if (typeof rawValue === 'object' && !Array.isArray(rawValue)) {
      styles[prop] = process(rawValue, theme)
      continue
    }

    // just make all values resposive-ready
    const values = [].concat(style[prop])

    for (let i = 0; i < values.length; i++) {
      const value = values[i]
      const themeValue = themeScale ? themeScale[value] : value
      const unitValue = unit ? unit(themeValue) : themeValue

      let s = styles
      const breakpoint = theme.breakpoints[i - 1]

      if (breakpoint) {
        const media = `@media (min-width: ${breakpoint})`

        s = styles[media] = styles[media] || {}
      }

      for (const rule of rules) {
        s[rule] = unitValue
      }
    }
  }

  return styles
}

export function hypostyle (props, theme = {}) {
  const { variants, shorthands, ...mergedTheme } = mergeTheme(theme)

  const styles = {}

  for (const prop of Object.keys(props)) {
    // shorthand exists and prop is true
    if (shorthands[prop] && props[prop] === true) {
      Object.assign(styles, shorthands[prop])
    } else if (variants[prop]) {
      Object.assign(styles, variants[prop][props[prop]])
    } else {
      styles[prop] = props[prop]
    }
  }

  return process(styles, mergedTheme)
}

export function clean (props, theme = {}) {
  const { variants, shorthands } = mergeTheme(theme)

  const styles = {}
  const extra = {}

  for (const prop of Object.keys(props)) {
    if (shorthands[prop] || variants[prop] || mapping[prop]) {
      styles[prop] = props[prop]
    } else {
      extra[prop] = props[prop]
    }
  }

  return {
    styles,
    props: extra
  }
}
