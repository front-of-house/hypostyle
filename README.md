![hypostyle](https://user-images.githubusercontent.com/4732330/102666621-09f0df00-414d-11eb-9178-9d46f113ea46.png)

<br/>

Hyper minimal framework-agnostic CSS-in-JS utility for easy theming, shorthands,
and variants.

```
npm i hypostyle
```

![npm](https://img.shields.io/npm/v/hypostyle) [![](https://badgen.net/bundlephobia/minzip/hypostyle)](https://bundlephobia.com/result?p=hypostyle)

#### Example

```javascript
import { hyposcript } from 'hyposcript'

const styles = hyposcript(
  {
    c: 'primary',
    rel: true,
    my: [2, 4],
    appearance: 'link'
  },
  {
    color: { primary: '#ff4567' },
    breakpoints: ['800px'],
    appearance: {
      link: {
        c: 'blue',
        textDecoration: 'underline',
        ':hover': {
          c: 'black'
        }
      }
    }
  }
)

/*

{
  color: '#ff4567',
  position: 'relative',
  marginTop: '8px',
  marginBottom: '8px',
  color: 'blue',
  textDecoration: 'underline',
  ':hover': {
    color: 'black',
  },
  '@media (min-width: 800px)': {
    marginTop: '16px',
    marginBottom: '16px',
  }
}

*/
```

## Overview

Coming soon. This library was closely based on
[hypobox](https://github.com/sure-thing/hypobox), so in the meantime, have a
look there to get the general idea.

### License

MIT License © [Sure Thing](https://github.com/sure-thing)
