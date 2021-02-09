const { create } = require('nano-css')
const { addon: cache } = require('nano-css/addon/cache')
const { addon: nesting } = require('nano-css/addon/nesting')
const { addon: keyframes } = require('nano-css/addon/keyframes')
const { addon: rule } = require('nano-css/addon/rule')
const { addon: globalAddon } = require('nano-css/addon/global')
const { addon: hydrate } = require('nano-css/addon/hydrate')

function parse (obj, theme) {
  const styles = {}

  for (const prop of Object.keys(obj)) {
    // if properties is undefined, the prop is some normie CSS prop
    const { properties = [prop], token: scale, unit } =
      theme.shorthands[prop] || {}
    const tokens = theme.tokens[scale]
    const rawValue = obj[prop]

    if (typeof rawValue === 'object' && !Array.isArray(rawValue)) {
      styles[prop] = style(rawValue, theme)
      continue
    }

    // just make all values resposive-ready
    const values = [].concat(obj[prop])

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

function style (props, theme) {
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

function hypostyle (theme = {}, config = {}) {
  const t = {
    tokens: {},
    breakpoints: [],
    shorthands: {},
    macros: {},
    variants: {},
    ...theme
  }

  const addons = [cache, nesting, keyframes, rule, globalAddon, hydrate].concat(
    config.addons || []
  )

  let nano = createNano()

  function createNano () {
    const nano = create({
      sh: typeof document === 'object' ? document.getElementById('hypo') : null
    })
    addons.map(a => a(nano))
    return nano
  }

  return {
    css (props) {
      const p = typeof props === 'function' ? props(t.tokens) : props
      return Object.keys(p).length ? nano.rule(style(p, t)) : ''
    },
    injectGlobal (props) {
      return nano.global(style(props, t))
    },
    keyframes: nano.keyframes,
    flush () {
      const raw = nano.raw
      nano = createNano()
      return raw
    },
    style (props) {
      return style(props, t)
    },
    pick (props) {
      return pick(props, t)
    }
  }
}

module.exports = { hypostyle }
