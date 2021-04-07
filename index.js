const { create } = require('nano-css')
const { addon: cache } = require('nano-css/addon/cache')
const { addon: nesting } = require('nano-css/addon/nesting')
const { addon: keyframes } = require('nano-css/addon/keyframes')
const { addon: rule } = require('nano-css/addon/rule')
const { addon: globalAddon } = require('nano-css/addon/global')
const { addon: hydrate } = require('nano-css/addon/hydrate')

const defaultCssProps = require('./properties')

function obj (o, theme) {
  return typeof o === 'function' ? o(theme) : o
}

/**
 * Expand macros and variants, then expand all shorthand props.
 *
 * Returns a hypostyle object
 */
function explode (props, theme) {
  const styles = {}

  // expand macros and variants, copy other props
  for (const prop of Object.keys(props)) {
    // macro exists AND prop is true
    if (theme.macros[prop] && (props[prop] === true || props[prop] === false)) {
      Object.assign(styles, theme.macros[prop])
    } else if (theme.variants[prop]) {
      Object.assign(styles, theme.variants[prop][props[prop]])
    } else {
      styles[prop] = props[prop]
    }
  }

  // recursively expand all shorthands
  for (const prop of Object.keys(styles)) {
    const value = styles[prop]

    // Could be nested object, ignore responsive array/object syntax
    if (
      typeof value === 'object' &&
      !Array.isArray(value) &&
      !/^\d/.test(Object.keys(value)[0])
    ) {
      styles[prop] = explode(value, theme)
      continue
    }

    if (theme.shorthands[prop]) {
      for (const p of [].concat(theme.shorthands[prop])) {
        styles[p] = value
      }

      delete styles[prop] // remove shorthand key
    } else {
      styles[prop] = value
    }
  }

  return styles
}

/**
 * Accepts a hypostyle object and converts it to a CSS object intelligible by
 * any CSS-in-JS library that supports objects.
 */
function style (props, theme) {
  const styles = {}

  for (const prop of Object.keys(props)) {
    const value = props[prop]
    const { token, unit } = theme.properties[prop] || {}
    const tokens = theme.tokens[token]

    if (typeof value === 'object' && !Array.isArray(value)) {
      const keyIndicies = Object.keys(value)

      // convert responsive object to array syntax
      if (/^\d/.test(keyIndicies[0])) {
        const arr = []

        for (const i of keyIndicies) {
          arr[i] = value[i]
        }

        props[prop] = arr
      } else {
        styles[prop] = style(value, theme)
        continue // continue main loop
      }
    }

    const values = [].concat(props[prop])

    for (let i = 0; i < values.length; i++) {
      const value = values[i]
      const token = tokens ? tokens[value] || value : value
      const unitValue = unit ? unit(token) : token

      // drop undefined values, all others pass through
      if (unitValue === undefined) continue

      let s = styles
      const breakpoint = theme.breakpoints[i - 1]

      if (breakpoint) {
        const media = `@media (min-width: ${breakpoint})`

        // drop down a level (into breakpoint)
        s = styles[media] = styles[media] || {}
      }

      // if someone passes a breakpoint that doesn't exist
      if (!breakpoint && i > 0) continue

      s[prop] = unitValue
    }
  }

  return styles
}

/**
 * Separates style props from everything else
 */
function pick (props, theme) {
  const styles = {}
  const extra = {}

  for (const prop of Object.keys(props)) {
    if (
      theme.macros[prop] ||
      theme.variants[prop] ||
      theme.shorthands[prop] ||
      theme.properties[prop]
    ) {
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

function createNano ({ addons }) {
  const nano = create({
    sh: typeof document === 'object' ? document.getElementById('hypo') : null
  })
  addons.map(a => a(nano))
  return nano
}

function hypostyle (theme = {}, config = {}) {
  const t = {
    tokens: {},
    breakpoints: [],
    macros: {},
    variants: {},
    ...theme,
    properties: {
      ...defaultCssProps,
      ...(theme.properties || {})
    },
    shorthands: {
      ...(theme.shorthands || {})
    }
  }

  const addons = [cache, nesting, keyframes, rule, globalAddon, hydrate].concat(
    config.addons || []
  )

  let nano = createNano({ addons })

  return {
    explode (props) {
      return explode(obj(props, t), t)
    },
    style (props) {
      return style(explode(obj(props, t), t), t)
    },
    css (props) {
      const styles = style(explode(obj(props, t), t), t)
      return Object.keys(styles).length ? nano.rule(styles) : ''
    },
    pick (props) {
      return pick(props, t)
    },
    injectGlobal (props) {
      nano.global(style(explode(obj(props, t), t), t))
    },
    keyframes: nano.keyframes,
    flush () {
      const raw = nano.raw
      nano = createNano({ addons })
      return raw
    },
    get theme () {
      return t
    }
  }
}

module.exports = { hypostyle }
