function parse (style, theme) {
  const styles = {}

  for (const prop of Object.keys(style)) {
    // if properties is undefined, the prop is some normie CSS prop
    const { properties = [prop], token: scale, unit } =
      theme.shorthands[prop] || {}
    const tokens = theme.tokens[scale]
    const rawValue = style[prop]

    if (typeof rawValue === 'object' && !Array.isArray(rawValue)) {
      styles[prop] = css(rawValue, theme)
      continue
    }

    // just make all values resposive-ready
    const values = [].concat(style[prop])

    for (let i = 0; i < values.length; i++) {
      const value = values[i]
      const token = tokens ? tokens[value] || value : value
      const unitValue = unit ? unit(token) : token

      let s = styles
      const breakpoint = theme.breakpoints[i - 1]

      if (breakpoint) {
        const media = `@media (min-width: ${breakpoint})`

        s = styles[media] = styles[media] || {}
      }

      for (const property of properties) {
        s[property] = unitValue
      }
    }
  }

  return styles
}

function pick (props, theme) {
  const styles = {}
  const extra = {}

  for (const prop of Object.keys(props)) {
    if (theme.macros[prop] || theme.variants[prop] || theme.shorthands[prop]) {
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

function css (props, theme) {
  const styles = {}

  for (const prop of Object.keys(props)) {
    // macro exists AND prop is true
    if (theme.macros[prop] && props[prop] === true) {
      Object.assign(styles, theme.macros[prop])
    } else if (theme.variants[prop]) {
      Object.assign(styles, theme.variants[prop][props[prop]])
    } else {
      styles[prop] = props[prop]
    }
  }

  return parse(styles, theme)
}

function hypostyle (theme = {}) {
  const t = {
    tokens: {},
    breakpoints: ['400px', '800px', '1200px'],
    shorthands: {},
    macros: {},
    variants: {},
    ...theme
  }

  return {
    css (props) {
      return css(props, t)
    },
    pick (props) {
      return pick(props, t)
    }
  }
}

module.exports = { pick, css, hypostyle }
