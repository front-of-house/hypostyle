![hypostyle](https://user-images.githubusercontent.com/4732330/102666621-09f0df00-414d-11eb-9178-9d46f113ea46.png)

<br/>

![npm](https://img.shields.io/npm/v/hypostyle) [![](https://badgen.net/bundlephobia/minzip/hypostyle)](https://bundlephobia.com/result?p=hypostyle)

Minimalist [5th
Generation](https://github.com/streamich/freestyler/blob/master/docs/en/generations.md#5th-generation)
CSS-in-JS built for concision and extension. Fast af, powered
by [nano-css](https://github.com/streamich/nano-css).

```
npm i hypostyle
```

#### Why

Typical [4th
gen](https://github.com/streamich/freestyler/blob/master/docs/en/generations.md#4th-generation)
CSS-in-JS can be very verbose. `hypostyle` provides a way of authoring CSS in
Javascript using shortcuts and abbreviations — like atomic CSS and frameworks
like [Tailwind](https://tailwindcss.com/) — at a fraction of the bundle size.
`hypostyle` is also framework-agnostic, meaning it can be adapted into any UI
framework and _any CSS-in-JS library_ that supports style objects.

<details>
  <summary>Full Example</summary>

```javascript
import { hypostyle } from 'hypostyle'

const { css } = hypostyle({
  breakpoints: ['400px', '800px', '1200px'],
  tokens: {
    color: {
      primary: '#ff4567'
    },
    space: [0, 4, 8, 12, 16, 20, 24, 28, 32]
  },
  shorthands: {
    c: ['color'],
    px: ['paddingLeft', 'paddingRight']
  }
})
```

➕

```javascript
const classname = css({
  c: 'primary',
  px: [4, 8]
})

function Component () {
  return <div className={classname} />
}
```

👇

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
- [Writing CSS](#writing-css)

# Getting Started

The `hypostyle()` function is used to configure a theme and return an instance.
Your theme can contain the following properties:

- `tokens` - design system tokens, like colors, spacing, etc
- `breakpoints` - array of breakpoint widths (optional)
- `shorthands` - abbreviated properties that map to one or more CSS properties
  and (optionally) design tokens
- `macros` - boolean properties mapped to pre-defined style objects
- `variants` - named groups of pre-defined style objects
- `properties` - config supported CSS properties

#### Presets

Hypostyle includes optional preset objects with a starter set of tokens,
shorthands, and macros. [Source
code](https://github.com/sure-thing/hypostyle/blob/master/presets/index.js).

```javascript
import * as presets from 'hypostyle/presets'

const { css } = hypostyle(presets)
```

## Responsive Values

_All values can be responsive_ by passing an array of values. This array maps to
the `breakpoints` array on your theme. The first value is mobile, and the
remaining values are convered into `@media` breakpoints.

```javascript
css({
  d: ['block', 'none']
})
```

Will generate:

```css
.__3sxrbm {
  display: block;
}
@media (min-width: 400px) {
  .__3sxrbm {
    display: none;
  }
}
```

Alternatively — and useful if you want to only specify a single breakpoint — you
can use object syntax. Just use the indices as object keys:

```javascript
css({
  d: { 1: 'none' }
})
```

```css
@media (min-width: 400px) {
  .__3sxrbm {
    display: none;
  }
}
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

Tokens are associated with configurable CSS properties so that you can use
token values in your styles. By default, _most_ CSS properties are supported and
are self referencing.

Shorthands are like shortcuts that allow you to abbreviate
CSS these properties. The rest of the above example could look like this:

```javascript
const { css } = hypostyle({
  tokens: {
    color: {
      primary: '#ff4557'
    },
    space: [0, 4, 8, 12, 16]
  },
  shorthands: {
    bg: 'background'
  }
})
```

Which can be used like this, because `background` is associated with the `color`
tokens by default:

```javascript
css({ bg: 'primary' }) // => { background: '#ff4567' }
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

## Writing CSS

#### Pseudos & Nested Selectors

```javascript
const link = css({
  color: 'black',
  '&:hover': {
    color: 'blue'
  },
  '.icon': {
    transform: 'translateX(5px)'
  }
})
```

#### Global Styles

Also included alongside `css` is `injectGlobal`.

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

Also also included alongside `css` is `keyframes`.

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

## Configuring CSS Properties

Hypostyle comes with built-in support for _most_ CSS properties. To add
additional support, have a look at the `properties.js` file for API, and pass
your additional props to the constructor. Example:

```javascript
const hypo = hypostyle({
  ...,
  tokens: {
    ...,
    radii: ['4px', '8px']
  },
  shorthands: {
    ...,
    bTLR: 'borderTopLeftRadius'
  },
  properties: {
    borderTopLeftRadius: {
      token: 'radii'
    }
  }
})
```

Usage:

```javascript
hypo.style({ bTLR: 1 }) // => { borderTopLeftRadius: '8px' }
```

## Server Usage

`hypostyle` is isomorphic!

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
