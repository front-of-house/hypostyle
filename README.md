![hypostyle](https://user-images.githubusercontent.com/4732330/102666621-09f0df00-414d-11eb-9178-9d46f113ea46.png)

<br/>

Hyper minimal framework-agnostic CSS-in-JS utility for easy theming, macros, and
variants. Hypostyle fits somewhere between inline styles and any styling
solution that supports style objects (not CSS strings).

![npm](https://img.shields.io/npm/v/hypostyle) [![](https://badgen.net/bundlephobia/minzip/hypostyle)](https://bundlephobia.com/result?p=hypostyle)

```
npm i hypostyle
```

```javascript
import { hypostyle } from 'hypostyle'

const { css } = hypostyle({
  tokens: {
    color: {
      primary: '#ff4567'
    }
  },
  shorthands: {
    c: {
      properties: ['color'],
      token: 'color'
    }
  },
  macros: {
    rel: {
      position: 'relative'
    }
  }
})

css({
  rel: true,
  c: 'primary',
  background: 'white'
}) // => { color: '#ff4567', position: 'relative', background: 'white' }
```

## Overview

The `hypostyle()` function is used to configure a theme and return an instance.
Your theme can contain the following properties:

- `tokens` - design system tokens, like colors, spacing, etc
- `breakpoints` - array of breakpoint widths (optional)
- `shorthands` - abbreviated properties that map to one or more CSS properties
  and (optionally) design tokens
- `macros` - boolean properties mapped to pre-defined style objects
- `variants` - named groups of pre-defined style objects

#### Recommended Defaults

Hypostyle includes a starter set of tokens, breakpoints, shorthands, and macros.
It's recommended to use these, or build off these with your own custom
properties.

```javascript
import * as defaults from 'hypostyle/presets/defaults'

const { css } = hypostyle(defaults)
```

#### Customization

You can also source the defaults individually for more fine-grained control and
extension.

```javascript
import tokens from 'hypostyle/utils/tokens'
import shorthands from 'hypostyle/utils/shorthands'
import macros from 'hypostyle/utils/macros'

const { css } = hypostyle({
  tokens: {
    ...tokens,
    colors: {
      primary: '#ff4567',
      secondary: '#ccc'
    }
  },
  breakpoints: ['360px', '568px', '900px', '1100px'],
  shorthands,
  macros
})
```

#### Responsive Values

All values can be responsive by passing an array of values. This array maps to
the `breakpoints` array on your theme. The first value is mobile, and the
remaining values are convered to `@media` breakpoints.

```javascript
css({
  d: ['none', 'block']
}) // => { display: 'none', '@media (min-width: 360px)': { display: 'block' } }
```

## Tokens

Tokens are either objects of named values, or arrays (scales) of values. The
name of the token scale simply needs to map to the `tokens` value on any
`shorthands` you configure.

```javascript
import shorthands from 'hypostyle/shorthands'

const { css } = hypostyle({
  tokens: {
    shadows: {
      light: '0px 0px 1px rgba(0, 0, 0, 0.04)',
      dark: '0px 0px 6px rgba(0, 0, 0, 0.1)'
    }
  },
  shorthands: {
    boxShadow: {
      properties: ['boxShadow'],
      token: 'shadows'
    }
  }
})
```

For examples, have a look at the [default
tokens](https://github.com/sure-thing/hypostyle/blob/master/utils/tokens.js) available.

## Shorthands

Shorthands are abbreviated shortcuts for normal CSS properties. They're
configured on the `shorthands` prop of the theme, and can have the following
properties.

- `properties` - an array of CSS property strings (required)
- `token` - the name of the property on the `tokens` theme object to source design
  tokens from (optional)
- `unit` - a function used to process the output value, if unit conversion is
  required (optional)

For example:

```javascript
const { css } = hypostyle({
  tokens: {
    color: {
      primary: '#ff4557'
    }
  },
  shorthands: {
    bg: {
      properties: ['background'],
      token: 'color'
    }
  }
})

css({ bg: 'primary' }) // => { background: '#ff4567' }
```

For ease of use, you'll probably want to alias your shorthands as well. This is
what Hypostyle does in its default
[shorthands](https://github.com/sure-thing/hypostyle/blob/master/utils/shorthands.js).

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

For more examples – including how to specify unit conversion – have a look at
the [default
shorthands](https://github.com/sure-thing/hypostyle/blob/master/utils/shorthands.js).

## Macros

`macros` are simple boolean values that expand to be full style objects. The
style objects can use any shorthands or tokens you have configured.

```javascript
const { css } = hypostyle({
  macros: {
    cover: { top: 0, bottom: 0, left: 0, right: 0 }
  }
)

css({ cover: true }) // => { top: 0, bottom: 0, ... }
```

These are most helpful when used with JSX (via React,
[hyposcript](https://github.com/sure-thing/hyposcript), or otherwise).

```jsx
<Box cover />
```

For examples, have a look at the [default
macros](https://github.com/sure-thing/hypostyle/blob/master/utils/macros.js) available.

## Variants

Slightly higher-level than macros are variants, which allow you to define named
style blocks based on property values. Again, your style blocks here can use any
shorthands and tokens you've configured.

```javascript
hypostyle(
  {
    appearance: 'link'
  },
  {
    variants: {
      appearance: {
        link: {
          c: 'blue',
          textDecoration: 'underline'
        }
      }
    }
  }
)
```

## Related

- [hyposcript](https://github.com/sure-thing/hyposcript)
- [hypobox](https://github.com/sure-thing/hypobox)
- [styled-system](https://github.com/styled-system/styled-system)
- [stitches](https://github.com/modulz/stitches)
- [nano-css](https://github.com/streamich/nano-css)

### License

MIT License © [Sure Thing](https://github.com/sure-thing)
