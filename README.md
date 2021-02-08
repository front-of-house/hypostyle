![hypostyle](https://user-images.githubusercontent.com/4732330/102666621-09f0df00-414d-11eb-9178-9d46f113ea46.png)

<br/>

![npm](https://img.shields.io/npm/v/hypostyle) [![](https://badgen.net/bundlephobia/minzip/hypostyle)](https://bundlephobia.com/result?p=hypostyle)

Hyper minimal framework agnostic CSS-in-JS with a next-gen API. Fast af, powered
by [nano-css](https://github.com/streamich/nano-css).

```
npm i hypostyle
```

#### Why

Hypostyle supports everything you'd expect from a modern CSS-in-JS solution:
themeing, nesting, SSR & Typescript support, etc. But it also includes a
[styled-system](https://styled-system.com/)-like API for property shorthands and
responsive values that elevates hypostyle above other similar libraries.

<details>
  <summary>Example</summary>

```javascript
import { hypostyle } from 'hypostyle'

const { css } = hypostyle({
  breakpoints: ['400px', '800px', '1200px'],
  tokens: {
    color: {
      black: '#333',
      primary: '#ff4567'
    },
    space: [0, 4, 8, 12, 16, 20, 24, 28, 32]
  },
  shorthands: {
    c: {
      properties: ['color'],
      token: 'color'
    },
    px: {
      properties: ['paddingLeft', 'paddingRight'],
      token: 'space',
      unit (value) {
        return value + 'px'
      }
    }
  }
})
```

```javascript
function Component () {
  const classname = css({
    c: 'primary',
    px: [4, 8]
  })

  return <div class={classname} />
}
```

```css
color: #ff4567;
padding-left: 16px;
padding-right: 16px;
@media (min-width: 400px) {
  padding-left: 32px;
  padding-right: 32px;
}
```

</details>

#### Contents

- [Presets](#presets)
- [Responsive Values](#responsive-values)
- [Tokens & Shorthands](#tokens--shorthands)
- [Macros](#macros)
- [Variants](#variants)
- [Browser Usage](#browser-usage)

# Getting Started

The `hypostyle()` function is used to configure a theme and return an instance.
Your theme can contain the following properties:

- `tokens` - design system tokens, like colors, spacing, etc
- `breakpoints` - array of breakpoint widths (optional)
- `shorthands` - abbreviated properties that map to one or more CSS properties
  and (optionally) design tokens
- `macros` - boolean properties mapped to pre-defined style objects
- `variants` - named groups of pre-defined style objects

#### Presets

Hypostyle includes optional preset objects with a starter set of tokens,
shorthands, and macros. [Source
code](https://github.com/sure-thing/hypostyle/blob/master/presets/index.js).

```javascript
import * as presets from 'hypostyle/presets'

const { css } = hypostyle(presets)
```

#### Responsive Values

_All values can be responsive_ by passing an array of values. This array maps to
the `breakpoints` array on your theme. The first value is mobile, and the
remaining values are convered to `@media` breakpoints.

```javascript
css({
  d: ['none', 'block']
}) // => { display: 'none', '@media (min-width: 400px)': { display: 'block' } }
```

## Tokens & Shorthands

Tokens are either objects of named values, or arrays (scales) of values.

```javascript
const { css } = hypostyle({
  tokens: {
    color: {
      primary: '#ff4557'
    },
    space: [0, 4, 8, 12, 16]
  }
})
```

Shorthands are like shortcuts that allow you to use `token` values or abbreviate
CSS properties. The rest of the above example could look like this:

```javascript
const { css } = hypostyle({
  tokens: {
    color: {
      primary: '#ff4557'
    },
    space: [0, 4, 8, 12, 16]
  },
  shorthands: {
    bg: {
      properties: ['background'],
      token: 'color'
    }
  }
})
```

Which can be used like this:

```javascript
css({ bg: 'primary' }) // => { background: '#ff4567' }
```

Shorthands can be configured with the following props:

- `properties` - an array of CSS property strings (required)
- `token` - the name of the property on the `tokens` theme object to source design
  tokens from (optional)
- `unit` - a function used to process the output value, if unit conversion is
  required (optional)

For ease of use, you'll probably want to alias your shorthands as well like
this:

```javascript
const shorthands = {
  bg: {
    properties: ['background'],
    token: 'color'
  }
}

shorthands.background = shorthands.bg

const { css } = hypostyle({
  tokens: {
    color: {
      primary: '#ff4557'
    }
  },
  shorthands
})

css({ background: 'primary' }) // => { background: '#ff4567' }
```

## Macros

`macros` are simple boolean values that expand to be full style objects. The
style objects can use any shorthands or tokens you have configured.

```javascript
const { css } = hypostyle({
  macros: {
    cover: { top: 0, bottom: 0, left: 0, right: 0 }
  }
})

css({ cover: true }) // => { top: 0, bottom: 0, ... }
```

These are most helpful when used with JSX (via React,
[hyposcript](https://github.com/sure-thing/hyposcript), or otherwise) i.e.:

```jsx
<Box cover />
```

## Variants

Slightly higher-level than macros are variants, which allow you to define named
style blocks based on property values. Again, your style blocks here can use any
shorthands and tokens you've configured.

```javascript
import * as presets from 'hypostyle/presets'

const { css } = hypostyle({
  ...presets,
  variants: {
    appearance: {
      link: {
        c: 'blue',
        textDecoration: 'underline'
      }
    }
  }
})
```

Which look like this when used:

```javascript
css({ appearance: 'link' }) // => { color: 'blue', textDecoration: 'underline' }
```

## Browser Usage

Hypostyle works out-of-the-box in the browser 👍

#### Global Styles

```javascript
import { hypostyle } from 'hypostyle'
import * as presets from 'hypostyle/presets'

const { injectGlobal } = hypostyle(presets)

injectGlobal({
  'html, body': {
    c: '#333',
    boxSizing: 'border-box'
  }
})
```

#### Keyframes

```javascript
const { keyframes } = hypostyle(presets)

const animation = keyframes({
  '0%': {
    opacity: 0
  },
  '100%': {
    opacity: 1
  }
})

css({
  animation: `${animation} 1s linear infinite`
})
```

## Server Usage

```javascript
const { css, flush, injectGlobal } = hypostyle(presets)
injectGlobal({ '*': { boxSizing: 'border-box' } })
const classname = css({ c: 'primary' })
const stylesheet = flush()

const html = `
<!DOCTYPE html>
<html>
  <head>
    <style>${stylesheet}</style>
  </head>
  <body>
    <div class="${classname}">Hello world</div>
  </body>
</html>
`
```

### Related

- [hyposcript](https://github.com/sure-thing/hyposcript)
- [hypobox](https://github.com/sure-thing/hypobox)
- [styled-system](https://github.com/styled-system/styled-system)
- [nano-css](https://github.com/streamich/nano-css)

### License

MIT License © [Sure Thing](https://github.com/sure-thing)
