const props = require('./props')
const { px } = require('./utils')

const tokens = {
  space: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64],
  fontSize: ['3rem', '3rem', '2.2rem', '1.8rem', '1.4rem', '1rem', '0.875rem'],
  fontWeight: [
    '0',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    '1000'
  ],
  lineHeight: [1.1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6]
}

const breakpoints = ['400px', '800px', '1200px']

const shorthands = {
  d: props.display,
  pos: props.position,
  w: props.width,
  h: props.height,
  c: props.color,
  bg: props.background,
  m: props.margin,
  mt: props.marginTop,
  mb: props.marginBottom,
  ml: props.marginLeft,
  mr: props.marginRight,
  my: {
    properties: ['marginTop', 'marginBottom'],
    token: 'space',
    unit: px
  },
  mx: {
    properties: ['marginLeft', 'marginRight'],
    token: 'space',
    unit: px
  },
  p: props.padding,
  pt: props.paddingTop,
  pb: props.paddingBottom,
  pl: props.paddingLeft,
  pr: props.paddingRight,
  py: {
    properties: ['paddingTop', 'paddingBottom'],
    token: 'space',
    unit: px
  },
  px: {
    properties: ['paddingLeft', 'paddingRight'],
    token: 'space',
    unit: px
  },
  z: props.zIndex,
  fs: props.fontSize,
  fw: props.fontWeight,
  lh: props.lineHeight,
  ta: props.textAlign
}

const macros = {
  db: { d: 'block' },
  dib: { d: 'inline-block' },
  di: { d: 'inline' },
  f: { d: 'flex' },
  fw: { flexWrap: 'wrap' },
  ais: { alignItems: 'flex-start' },
  aic: { alignItems: 'center' },
  aie: { alignItems: 'flex-end' },
  jcs: { justifyContent: 'flex-start' },
  jcc: { justifyContent: 'center' },
  jce: { justifyContent: 'flex-end' },
  jca: { justifyContent: 'space-around' },
  jcb: { justifyContent: 'space-between' },
  rel: { position: 'relative' },
  abs: { position: 'absolute' },
  fix: { position: 'fixed' },
  top: { top: 0 },
  bottom: { bottom: 0 },
  left: { left: 0 },
  right: { right: 0 },
  cover: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  w: { w: 1 },
  h: { h: 1 },
  tac: { ta: 'center' },
  tar: { ta: 'right' },
  taj: { ta: 'justify' },
  ma: { m: 'auto' },
  mxa: { mx: 'auto' },
  mya: { my: 'auto' }
}

module.exports = {
  tokens,
  breakpoints,
  shorthands,
  macros
}
