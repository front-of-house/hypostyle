import merge from 'deep-extend'
import { Properties as CSSProperties, Pseudos as CSSPsuedos } from 'csstype'
import { create, CssLikeObject } from 'nano-css'
import { addon as cache } from 'nano-css/addon/cache'
import { addon as nesting } from 'nano-css/addon/nesting'
import { addon as keyframes } from 'nano-css/addon/keyframes'
import { addon as rule } from 'nano-css/addon/rule'
import { addon as globalAddon } from 'nano-css/addon/global'
import { addon as hydrate } from 'nano-css/addon/hydrate'

import * as presets from './presets'
import { properties as cssPropertyMapping } from './properties'

type UnknownKeyValue = Record<string, unknown>
type Unitless = string | number
type UnitlessKeyValue = { [name: string]: Unitless }
type CSSPropertyNames = keyof CSSProperties

export type HypostyleValue = { [k: number]: Unitless } | Unitless[] | Unitless | boolean | undefined

export type HypostyleObject =
  | ({
      // normal css
      [property in CSSPropertyNames]?: HypostyleValue
    } & {
      // psuedo selector blocks
      [pseudo in CSSPsuedos]?: HypostyleObject
    } & {
      // nested selector blocks
      [tag in keyof HTMLElementTagNameMap]?: HypostyleObject
    } & {
      // any other selector
      [selector: string]: HypostyleObject
    })
  | {
      // any hypostyle properties
      [prop: string]: HypostyleObject | HypostyleValue | any
    }

export type HypostyleObjectOrFunction = ((theme: Theme) => HypostyleObject) | HypostyleObject

export type Tokens = {
  [property in CSSPropertyNames]?: Unitless | Unitless[] | UnitlessKeyValue
} & {
  space?: Unitless | Unitless[] | UnitlessKeyValue
}

export type Shorthands = {
  [shorthand: string]: CSSPropertyNames | CSSPropertyNames[]
}

export type Macros = {
  [macro: string]: HypostyleObject
}

export type Variants = {
  [variation: string]: {
    [name: string]: HypostyleObject
  }
}

export type CSSPropertyMapping = {
  [property in CSSPropertyNames]?: {
    token?: keyof Tokens
    unit?(value: any): string
  }
}

export interface UserTheme {}

export type Theme = {
  breakpoints?: Unitless[]
  tokens?: Tokens
  shorthands?: Shorthands
  macros?: Macros
  variants?: Variants
  properties?: CSSPropertyMapping
} & UserTheme

export type Hypostyle = ReturnType<typeof hypostyle>

function obj(o: HypostyleObjectOrFunction, theme: Theme): HypostyleObject {
  return typeof o === 'function' ? o(theme) : o
}

/**
 * Expand macros and variants, then expand all shorthand props.
 *
 * Returns a hypostyle object
 */
function explode(props: HypostyleObject, theme: Theme) {
  var styles = {}

  // expand macros and variants, copy other props
  for (var prop in props) {
    if (!props.hasOwnProperty(prop)) continue // skip proto

    // macro exists AND prop is true
    if (theme.macros[prop] && (props[prop] === true || props[prop] === false)) {
      if (props[prop] === true) merge(styles, theme.macros[prop])
    } else if (theme.variants[prop]) {
      merge(styles, theme.variants[prop][props[prop] as string])
    } else {
      styles[prop] = props[prop]
    }
  }

  // recursively expand all shorthands
  for (var prop in styles) {
    if (!styles.hasOwnProperty(prop)) continue // skip proto

    var value = styles[prop]

    // Could be nested object, ignore responsive array/object syntax
    if (typeof value === 'object' && !Array.isArray(value) && !/^\d/.test(Object.keys(value)[0])) {
      styles[prop] = explode(value, theme)
      continue
    }

    if (theme.shorthands[prop]) {
      var shorthands = [].concat(theme.shorthands[prop])

      for (var i = 0; i < shorthands.length; i++) {
        styles[shorthands[i]] = value
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
function style(props: HypostyleObject, theme: Theme): CssLikeObject {
  var styles = {}

  for (var prop in props) {
    if (!props.hasOwnProperty(prop)) continue // skip proto

    var mixedObject: HypostyleObject | HypostyleValue = props[prop]

    // must have a style object or responsive object
    if (typeof mixedObject === 'object' && !Array.isArray(mixedObject)) {
      var keyIndicies = Object.keys(mixedObject)

      // convert responsive object to array syntax
      if (/^\d/.test(keyIndicies[0])) {
        var arr = []

        keyIndicies.forEach((i) => {
          arr[i] = mixedObject[i]
        })

        props[prop] = arr
      } else {
        /*
         * Safely merge in nested prop — there may be duplicate keys, like
         * after shorthand expansion or a custom media query block
         */
        var nested = {}
        nested[prop] = style(mixedObject, theme)
        merge(styles, nested)
        continue // continue, nested style object
      }
    }

    var config = theme.properties[prop] || {}
    var tokens = theme.tokens[config.token]
    var values = [].concat(props[prop])

    for (var o = 0; o < values.length; o++) {
      var value = values[o]
      var token = tokens ? tokens[value] || value : value
      var unitValue = config.unit ? config.unit(token) : token

      // drop undefined values, all others pass through
      if (unitValue === undefined) continue

      var s = styles
      var breakpoint = theme.breakpoints[o - 1]

      if (breakpoint) {
        var media = `@media (min-width: ${breakpoint})`

        // drop down a level (into breakpoint)
        s = styles[media] = styles[media] || {}
      }

      // if someone passes a breakpoint that doesn't exist
      if (!breakpoint && o > 0) continue

      s[prop] = unitValue
    }
  }

  return styles
}

/**
 * Separates style props from everything else
 */
function pick<T>(props: HypostyleObject, theme: Theme): { styles: HypostyleObject; props: T } {
  var styles = {}
  var extra = {}

  for (var prop in props) {
    if (!props.hasOwnProperty(prop)) continue // skip proto

    if (theme.macros[prop] || theme.variants[prop] || theme.shorthands[prop] || theme.properties[prop]) {
      styles[prop] = props[prop]
    } else {
      extra[prop] = props[prop]
    }
  }

  return {
    styles,
    props: extra as T,
  }
}

function createNano(options: { addons?: any[]; prefix?: string }) {
  var nano = create({
    pfx: options.prefix || '_',
    // @ts-expect-error
    sh: typeof document === 'object' ? document.getElementById('hypo') : null,
  })
  if (options.addons)
    options.addons.forEach(function (a) {
      a(nano)
    })
  return nano
}

export function hypostyle(
  theme?: Theme,
  config?: {
    addons?: any[]
    prefix?: string
  }
) {
  theme = theme || presets
  config = config || {}

  var t: Theme = merge(
    {
      tokens: {},
      breakpoints: [],
      macros: {},
      variants: {},
      properties: {
        ...cssPropertyMapping,
      },
      shorthands: {},
    },
    theme
  )

  var addons = [cache, nesting, keyframes, rule, globalAddon, hydrate].concat(config.addons || [])
  var nano = createNano({ addons, prefix: config.prefix })

  return {
    explode: function (props: HypostyleObjectOrFunction) {
      return explode(obj(props, t), t)
    },
    style: function (props: HypostyleObjectOrFunction) {
      return style(explode(obj(props, t), t), t)
    },
    css: function (props: HypostyleObjectOrFunction) {
      var styles = style(explode(obj(props, t), t), t)
      return Object.keys(styles).length ? nano.rule(styles) : ''
    },
    pick: function <T = UnknownKeyValue>(props: HypostyleObject & UnknownKeyValue) {
      return pick<T>(props, t)
    },
    injectGlobal: function (props: HypostyleObject) {
      nano.global(style(explode(obj(props, t), t), t))
    },
    keyframes: nano.keyframes,
    flush: function () {
      var raw = nano.raw
      nano = createNano({ addons })
      return raw
    },
    get theme() {
      return t
    },
  }
}
