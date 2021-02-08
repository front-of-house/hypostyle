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

function px (v) {
  return typeof v === 'number' ? v + 'px' : v
}

function str (v) {
  return v + ''
}

function percOrPx (v) {
  return typeof v === 'number' ? (v <= 1 ? v * 100 + '%' : v + 'px') : v
}

const shorthands = {
  d: {
    properties: ['display']
  },
  top: {
    properties: ['top'],
    token: 'space',
    unit: px
  },
  bottom: {
    properties: ['bottom'],
    token: 'space',
    unit: px
  },
  left: {
    properties: ['left'],
    token: 'space',
    unit: px
  },
  right: {
    properties: ['right'],
    token: 'space',
    unit: px
  },
  w: {
    properties: ['width'],
    token: 'width',
    unit: percOrPx
  },
  h: {
    properties: ['height'],
    unit: percOrPx
  },
  mw: {
    properties: ['maxWidth'],
    token: 'width',
    unit: percOrPx
  },
  c: {
    properties: ['color'],
    token: 'color'
  },
  bg: {
    properties: ['background'],
    token: 'color'
  },
  fw: {
    properties: ['flexWrap']
  },
  ai: {
    properties: ['alignItems']
  },
  jc: {
    properties: ['justifyContent']
  },
  o: {
    properties: ['order'],
    unit: str
  },
  m: {
    properties: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    token: 'space',
    unit: px
  },
  mt: {
    properties: ['marginTop'],
    token: 'space',
    unit: px
  },
  mb: {
    properties: ['marginBottom'],
    token: 'space',
    unit: px
  },
  ml: {
    properties: ['marginLeft'],
    token: 'space',
    unit: px
  },
  mr: {
    properties: ['marginRight'],
    token: 'space',
    unit: px
  },
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
  p: {
    properties: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    token: 'space',
    unit: px
  },
  pt: {
    properties: ['paddingTop'],
    token: 'space',
    unit: px
  },
  pb: {
    properties: ['paddingBottom'],
    token: 'space',
    unit: px
  },
  pl: {
    properties: ['paddingLeft'],
    token: 'space',
    unit: px
  },
  pr: {
    properties: ['paddingRight'],
    token: 'space',
    unit: px
  },
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
  z: {
    properties: ['zIndex'],
    token: 'zIndex',
    unit: str
  },
  fs: {
    properties: ['fontSize'],
    token: 'fontSize'
  },
  ff: {
    properties: ['fontFamily'],
    token: 'fontFamily'
  },
  fe: {
    properties: ['fontWeight'],
    token: 'fontWeight',
    unit: str
  },
  ta: {
    properties: ['textAlign']
  },
  lh: {
    properties: ['lineHeight'],
    token: 'lineHeight'
  }
}

shorthands.display = shorthands.d
shorthands.width = shorthands.w
shorthands.height = shorthands.h
shorthands.maxWidth = shorthands.mw
shorthands.color = shorthands.c
shorthands.background = shorthands.bg
shorthands.flexWrap = shorthands.fw
shorthands.alignItems = shorthands.ai
shorthands.justifyContent = shorthands.jc
shorthands.order = shorthands.o
shorthands.margin = shorthands.m
shorthands.marginTop = shorthands.mt
shorthands.marginBottom = shorthands.mb
shorthands.marginLeft = shorthands.ml
shorthands.marginRight = shorthands.mr
shorthands.padding = shorthands.p
shorthands.paddingTop = shorthands.pt
shorthands.paddingBottom = shorthands.pb
shorthands.paddingLeft = shorthands.pl
shorthands.paddingRight = shorthands.pr
shorthands.zIndex = shorthands.z
shorthands.fontSize = shorthands.fs
shorthands.fontFamily = shorthands.ff
shorthands.fontWeight = shorthands.fe
shorthands.textAlign = shorthands.ta
shorthands.lineHeight = shorthands.lh

const macros = {
  db: { d: 'block' },
  dib: { d: 'inline-block' },
  di: { d: 'inline' },
  f: { d: 'flex' },
  fw: { fw: 'wrap' },
  ais: { ai: 'flex-start' },
  aic: { ai: 'center' },
  aie: { ai: 'flex-end' },
  jcs: { jc: 'flex-start' },
  jcc: { jc: 'center' },
  jce: { jc: 'flex-end' },
  jca: { jc: 'space-around' },
  jcb: { jc: 'space-between' },
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
  taj: { ta: 'justify' }
}

module.exports = { tokens, breakpoints, shorthands, macros }
