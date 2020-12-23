import { hypostyle } from '../index'
import shorthands from '../utils/shorthands'
import macros from '../utils/macros'
import tokens from '../utils/tokens'
import * as defaults from '../presets/default'

const { css } = hypostyle(defaults)

export default (test, assert) => {
  for (const key of Object.keys(shorthands)) {
    test(`shorthands - ${key}`, () => {
      const { unit, properties, token: scale } = shorthands[key]
      const rawValue = 0
      const themeScale = tokens[scale]
      const themeValue = themeScale ? themeScale[rawValue] : rawValue
      const parsedValue = unit ? unit(themeValue) : themeValue

      const styles = css({ [key]: rawValue })

      for (const property of properties) {
        assert.deepEqual(styles[property], parsedValue)
      }
    })
  }

  for (const key of Object.keys(macros)) {
    test(`macro - ${key}`, () => {
      const rawStyles = css(macros[key])
      const styles = css({ [key]: true })

      assert.deepEqual(rawStyles, styles)
    })
  }

  test('works on arbitrary props', () => {
    const styles = css({
      borderBottomRightRadius: '4px'
    })

    assert(styles.borderBottomRightRadius === '4px')
  })

  test('non-theme matched', () => {
    const styles = css({
      c: 'other'
    })

    assert(styles.color === 'other')
  })

  test('prop with scale and provided value', () => {
    const styles = css({
      w: '50%'
    })

    assert(styles.width === '50%')
  })

  test('percentOrPixel heuristic', () => {
    const styles = css({
      w: 5,
      h: 1 / 2
    })

    assert(styles.width === '5px')
    assert(styles.height === '50%')
  })

  test('px heuristic', () => {
    const styles = css({
      pt: '4px'
    })

    assert(styles.paddingTop === '4px')
  })

  test('can merge theme', () => {
    const { css } = hypostyle({
      tokens: {
        color: {
          primary: 'blue'
        }
      },
      shorthands
    })
    const styles = css({
      c: 'primary'
    })

    assert(styles.color === 'blue')
  })

  test('can merge macros', () => {
    const { css } = hypostyle({
      shorthands,
      macros: {
        button: {
          borderRadius: '4px',
          bg: 'blue'
        }
      }
    })
    const styles = css({
      button: true
    })

    assert(styles.background === 'blue')
    assert(styles.borderRadius === '4px')
  })

  test('variants', () => {
    const { css } = hypostyle({
      shorthands,
      variants: {
        appearance: {
          primary: {
            c: 'blue',
            bg: 'whitesmoke'
          }
        }
      }
    })
    const styles = css({
      appearance: 'primary'
    })

    assert(styles.color === 'blue')
    assert(styles.background === 'whitesmoke')
  })

  test('breakpoints', () => {
    const { css } = hypostyle({
      breakpoints: ['400px', '800px'],
      shorthands
    })
    const styles = css({
      c: ['blue', 'red', 'green']
    })

    assert(styles.color === 'blue')
    assert(styles['@media (min-width: 400px)'].color === 'red')
    assert(styles['@media (min-width: 800px)'].color === 'green')
  })

  test('pseudo and other selectors', () => {
    const styles = css({
      ':hover': {
        c: 'blue',
        p: 2
      },
      div: {
        c: 'blue'
      },
      'div > foo': {
        c: 'blue'
      }
    })

    assert(styles[':hover'].color === 'blue')
    assert(styles[':hover'].paddingTop === '8px')
    assert(styles.div.color === 'blue')
    assert(styles['div > foo'].color === 'blue')
  })

  test('pick', () => {
    const { pick } = hypostyle({
      tokens,
      shorthands,
      macros,
      variants: {
        appearance: {
          primary: {
            c: 'blue'
          }
        }
      }
    })
    const { props, styles } = pick({
      c: 'blue',
      f: true,
      appearance: 'primary',
      className: 'cx'
    })

    assert(!!styles.c)
    assert(!!styles.f)
    assert(!!styles.appearance)
    assert(!!props.className)
  })
}
