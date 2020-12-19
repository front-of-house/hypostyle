import { hypostyle, clean } from '../index'
import { mapping } from '../lib/mapping'
import { shorthands } from '../lib/shorthands'
import { theme } from '../lib/theme'

export default (test, assert) => {
  for (const key of Object.keys(shorthands)) {
    test(`shorthand - ${key}`, () => {
      const rawStyles = hypostyle(shorthands[key])
      const styles = hypostyle({ [key]: true })

      assert.deepEqual(rawStyles, styles)
    })
  }

  for (const key of Object.keys(mapping)) {
    test(`mapping - ${key}`, () => {
      const { unit, rules, scale } = mapping[key]
      const rawValue = 0
      const themeScale = theme[scale]
      const themeValue = themeScale ? themeScale[rawValue] : rawValue
      const parsedValue = unit ? unit(themeValue) : themeValue

      const styles = hypostyle({ [key]: rawValue })

      for (const rule of rules) {
        assert.deepEqual(styles[rule], parsedValue)
      }
    })
  }

  test('works on arbitrary props', () => {
    const styles = hypostyle({
      borderBottomRightRadius: '4px'
    })

    assert(styles.borderBottomRightRadius, '4px')
  })

  test('can merge theme', () => {
    const styles = hypostyle(
      {
        c: 'primary'
      },
      {
        color: {
          primary: 'blue'
        }
      }
    )

    assert(styles.color, 'blue')
  })

  test('can merge shorthands', () => {
    const styles = hypostyle(
      {
        button: true
      },
      {
        shorthands: {
          button: {
            borderRadius: '4px',
            bg: 'blue'
          }
        }
      }
    )

    assert(styles.background, 'blue')
    assert(styles.borderRadius, '4px')
  })

  test('variants', () => {
    const styles = hypostyle(
      {
        appearance: 'primary'
      },
      {
        variants: {
          appearance: {
            primary: {
              c: 'blue',
              bg: 'whitesmoke'
            }
          }
        }
      }
    )

    assert(styles.color, 'blue')
    assert(styles.background, 'whitesmoke')
  })

  test('breakpoints', () => {
    const styles = hypostyle(
      {
        c: ['blue', 'red', 'green']
      },
      {
        breakpoints: ['400px', '800px']
      }
    )

    assert(styles.color, 'blue')
    assert(styles['@media (min-width: 400px)'].color, 'red')
    assert(styles['@media (min-width: 800px)'].color, 'green')
  })

  test('pseudo and other selectors', () => {
    const styles = hypostyle({
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

    assert(styles[':hover'].color, 'blue')
    assert(styles[':hover'].paddingTop, '8px')
    assert(styles.div.color, 'blue')
    assert(styles['div > foo'].color, 'blue')
  })

  test('clean', () => {
    const { props, styles } = clean(
      {
        c: 'blue',
        f: true,
        appearance: 'primary',
        className: 'cx'
      },
      {
        variants: {
          appearance: {
            primary: {
              c: 'blue',
              bg: 'whitesmoke'
            }
          }
        }
      }
    )

    assert(!!styles.c)
    assert(!!styles.f)
    assert(!!styles.appearance)
    assert(!!props.className)
  })
}
