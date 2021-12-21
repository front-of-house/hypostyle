import { CssLikeObject } from 'nano-css'
import { test } from 'uvu'
import * as assert from 'uvu/assert'

import { hypostyle } from '../'
import { properties as defaultCssProps } from '../properties'
import * as defaults from '../presets'

const { tokens, shorthands, macros } = defaults

test('explode', () => {
  const { explode } = hypostyle({
    shorthands: {
      c: 'color',
      m: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
      d: 'display',
    },
  })

  const styles: CssLikeObject = {
    ...explode({ c: 'blue' }),
    ...explode({ color: 'red' }),
    ...explode({
      div: {
        a: {
          c: 'tomato',
        },
      },
    }),
    ...explode({
      m: [0, 1, 2],
      d: { 0: 'none', 1: 'block' },
    }),
  }

  assert.equal(styles.color, 'red')
  assert.equal(styles.marginTop[1], 1)
  assert.equal(typeof styles.display, 'object')
  assert.equal(styles.div.a.color, 'tomato')
})

test('style', () => {
  const { style } = hypostyle({
    breakpoints: ['400px', '800px', '1200px'],
    tokens: {
      space: [0, 4, 8, 12],
    },
    shorthands: {
      c: 'color',
      m: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    },
  })

  const styles = {
    ...style({ c: 'blue' }),
    ...style({ m: [0, 1, 2] }),
  }

  assert.equal(styles.color, 'blue')
  assert.equal(styles.marginTop, '0px')
})

for (const key of Object.keys(defaultCssProps)) {
  test(`props - ${key}`, () => {
    const { style } = hypostyle(defaults)

    const { unit, token } = defaultCssProps[key]
    const rawValue = 0
    const themeScale = tokens[token]
    const themeValue = themeScale ? themeScale[rawValue] : rawValue
    const parsedValue = unit ? unit(themeValue) : themeValue

    const styles = style({ [key]: rawValue })

    assert.equal(styles[key], parsedValue)
  })
}

for (const key of Object.keys(shorthands)) {
  test(`shorthands - ${key}`, () => {
    const { style } = hypostyle(defaults)

    const properties = [].concat(shorthands[key])

    for (const prop of properties) {
      const { unit, token } = defaultCssProps[prop]
      const rawValue = 0
      const themeScale = tokens[token]
      const themeValue = themeScale ? themeScale[rawValue] : rawValue
      const parsedValue = unit ? unit(themeValue) : themeValue

      const styles = style({ [prop]: rawValue })

      assert.equal(styles[prop], parsedValue)
    }
  })
}

for (const key of Object.keys(macros)) {
  test(`macro - ${key}`, () => {
    const { style } = hypostyle(defaults)

    const rawStyles = style(macros[key])
    const styles = style({ [key]: true })

    assert.equal(rawStyles, styles)
  })
}

test('macro - falsy', () => {
  const { css, flush } = hypostyle({
    macros: {
      b: {
        color: 'blue',
      },
    },
  })

  css({ color: 'tomato', b: true })
  assert.ok(/color:blue/.test(flush()))

  css({ color: 'tomato', b: false })
  assert.ok(/color:tomato/.test(flush()))
})

test('no styles, empty', () => {
  const { css } = hypostyle(defaults)

  const cn = css({})

  assert.equal('', cn)
})

test('works on arbitrary props', () => {
  const { style } = hypostyle(defaults)

  const styles = style({
    borderBottomRightRadius: '4px',
  })

  assert.equal(styles.borderBottomRightRadius, '4px')
})

test('non-theme matched', () => {
  const { style } = hypostyle(defaults)

  const styles = style({
    c: 'other',
  })

  assert.equal(styles.color, 'other')
})

test('prop with scale and provided value', () => {
  const { style } = hypostyle(defaults)

  const styles = style({
    w: '50%',
  })

  assert.equal(styles.width, '50%')
})

test('percentOrPixel heuristic', () => {
  const { style } = hypostyle(defaults)

  const styles = style({
    w: 5,
    h: 1 / 2,
  })

  assert.equal(styles.width, '5px')
  assert.equal(styles.height, '50%')
})

test('px heuristic', () => {
  const { style } = hypostyle(defaults)

  const styles = style({
    pt: '4px',
  })

  assert.equal(styles.paddingTop, '4px')
})

test('style as a function', () => {
  const { style, theme } = hypostyle(defaults)

  const styles = style((theme) => ({
    fs: theme.tokens.fontSize[1],
  }))

  assert.equal(styles.fontSize, theme.tokens.fontSize[1])
})

test('negative values', () => {
  const { css, flush } = hypostyle(defaults)

  css({
    mt: -2,
  })
  const sheet = flush()

  assert.equal(/-2px/.test(sheet), true)
})

test('can merge theme', () => {
  const { style } = hypostyle({
    tokens: {
      color: {
        primary: 'blue',
      },
    },
    shorthands,
  })
  const styles = style({
    c: 'primary',
  })

  assert.equal(styles.color, 'blue')
})

test('can merge macros', () => {
  const { style } = hypostyle({
    shorthands,
    macros: {
      button: {
        borderRadius: '4px',
        bg: 'blue',
      },
    },
  })
  const styles = style({
    button: true,
  })

  assert.equal(styles.background, 'blue')
  assert.equal(styles.borderRadius, '4px')
})

test('variants', () => {
  const { style } = hypostyle({
    shorthands,
    variants: {
      appearance: {
        primary: {
          c: 'blue',
          bg: 'whitesmoke',
        },
      },
    },
  })
  const styles = style({
    appearance: 'primary',
  })

  assert.equal(styles.color, 'blue')
  assert.equal(styles.background, 'whitesmoke')
})

test('breakpoints', () => {
  const { style } = hypostyle({
    breakpoints: ['400px', '800px'],
    shorthands,
  })
  const styles = style({
    c: ['blue', 'red', 'green'],
  })

  assert.equal(styles.color, 'blue')
  assert.equal(styles['@media (min-width: 400px)'].color, 'red')
  assert.equal(styles['@media (min-width: 800px)'].color, 'green')
})

test('too many breakpoints', () => {
  const { style } = hypostyle({
    breakpoints: ['400px', '800px'],
    shorthands,
  })
  const styles = style({
    c: ['blue', 'red', 'green', 'tomato'],
  })

  assert.equal(styles.color, 'blue') // could otherwise be tomato
})

test('named breakpoints', () => {
  const { style } = hypostyle({
    breakpoints: ['400px', '800px', '1200px'],
    shorthands,
  })
  const styles = style({
    c: { 0: 'blue', 2: 'red' },
  })

  assert.equal(styles.color, 'blue')
  assert.equal(styles['@media (min-width: 800px)'].color, 'red')
})

test('breakpoints to sheet', () => {
  const { css, flush } = hypostyle({
    breakpoints: ['400px', '800px'],
    shorthands,
  })
  css({ c: ['blue', 'red', 'green'] })
  const sheet = flush()

  assert.ok(sheet.includes('blue'))
  assert.ok(sheet.includes('@media (min-width: 400px'))
  assert.ok(sheet.includes('@media (min-width: 800px)'))
})

test('pseudo and other selectors', () => {
  const { style } = hypostyle(defaults)

  const styles = style({
    ':hover': {
      c: 'blue',
      p: 2,
    },
    div: {
      c: 'blue',
    },
    'div > foo': {
      c: 'blue',
    },
  })

  assert.equal(styles[':hover'].color, 'blue')
  assert.equal(styles[':hover'].paddingTop, '8px')
  assert.equal(styles.div.color, 'blue')
  assert.equal(styles['div > foo'].color, 'blue')
})

test('pseudo elements', () => {
  const { css, flush } = hypostyle(defaults)

  css({
    '&::after': {
      content: '"a"',
    },
    '&::before': {
      content: '"b"',
    },
  })

  const sheet = flush()

  assert.ok(/content:"a"/.test(sheet))
  assert.ok(/content:"b"/.test(sheet))
})

test('pick', () => {
  const { pick } = hypostyle({
    tokens,
    shorthands,
    macros,
    variants: {
      appearance: {
        primary: {
          c: 'blue',
        },
      },
    },
  })
  const { props, styles } = pick({
    c: 'blue',
    f: true,
    appearance: 'primary',
    className: 'cx',
  })

  assert.ok(!!styles.c)
  assert.ok(!!styles.f)
  assert.ok(!!styles.appearance)
  assert.ok(!!props.className)
})

test('css', () => {
  const { css } = hypostyle(defaults)

  const cx = css({ c: 'blue' })
  const cx2 = css({ c: 'blue' })
  assert.equal(typeof cx, 'string')
  assert.equal(cx, cx2)
})

test('flush', () => {
  const { css, flush } = hypostyle(defaults)
  const cn = css({ c: 'blue' }).trim() // remove spaces
  const sheet = flush()
  assert.ok(new RegExp(cn).test(sheet))
})

test('injectGlobal', () => {
  const { injectGlobal, flush } = hypostyle({})
  injectGlobal({ html: { color: 'blue' } })
  const sheet = flush()
  assert.ok(sheet.includes('color:blue'))
})

test('keyframes', () => {
  const { css, keyframes, flush } = hypostyle(defaults)
  const animation = keyframes({
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(359deg)',
    },
  })
  css({
    animation: `${animation} 1s`,
  })
  const sheet = flush()

  assert.ok(sheet.includes(animation))
})

test('css as a function', () => {
  const { css, flush } = hypostyle(defaults)

  css((theme) => ({ fs: theme.tokens.fontSize[1] }))

  const sheet = flush()

  assert.ok(sheet.includes('font-size:3rem'))
})

test('nested elements', () => {
  const { css, flush } = hypostyle(defaults)

  const cn = css({
    div: {
      color: 'tomato',
    },
  })
  const sheet = flush()
  const selector = new RegExp(`.${cn.trim()} div`)

  assert.equal(selector.test(sheet), true)
})

test('pseudo selectors', () => {
  const { css, flush } = hypostyle(defaults)

  const cn = css({
    '&:hover': {
      color: 'tomato',
    },
  })
  const sheet = flush()
  const selector = new RegExp(`.${cn.trim()}:hover`)

  assert.equal(selector.test(sheet), true)
})

test('pseudo selectors w/ nested elements', () => {
  const { css, flush } = hypostyle(defaults)

  const cn = css({
    '&:hover div': {
      color: 'tomato',
    },
  })
  const sheet = flush()
  const selector = new RegExp(`.${cn.trim()}:hover div`)

  assert.equal(selector.test(sheet), true)
})

test('media queries', () => {
  const { css, flush } = hypostyle(defaults)

  css({
    '@media (min-width: 567px)': {
      color: 'tomato',
    },
  })
  const sheet = flush()

  assert.equal(/@media\s\(min-width: 567px\)/.test(sheet), true)
})

test('prefix', () => {
  const { css, flush } = hypostyle(defaults, { prefix: 'hypo' })

  css({
    '@media (min-width: 567px)': {
      color: 'tomato',
    },
  })
  const sheet = flush()

  assert.equal(/hypo/.test(sheet), true)
})

/**
 * @see https://github.com/sure-thing/hypostyle/issues/7
 */
test('issue #7', async () => {
  const { style } = hypostyle(defaults)

  const styles = style({
    color: ['blue', 'red'],
    [`@media (min-width: ${defaults.breakpoints[0]})`]: {
      background: 'tomato',
    },
  })

  assert.equal(styles, {
    color: 'blue',
    '@media (min-width: 400px)': { color: 'red', background: 'tomato' },
  })
})

test.run()
