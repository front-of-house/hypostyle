function px (v) {
  return typeof v === 'number' ? v + 'px' : v
}

function str (v) {
  return v + ''
}

function percentOrPixel (v) {
  return typeof v === 'number' ? (v <= 1 ? v * 100 + '%' : v + 'px') : v
}

export const mapping = {
  d: {
    rules: ['display']
  },
  top: {
    rules: ['top'],
    scale: 'space',
    unit: px
  },
  bottom: {
    rules: ['bottom'],
    scale: 'space',
    unit: px
  },
  left: {
    rules: ['left'],
    scale: 'space',
    unit: px
  },
  right: {
    rules: ['right'],
    scale: 'space',
    unit: px
  },
  w: {
    rules: ['width'],
    scale: 'width',
    unit: percentOrPixel
  },
  h: {
    rules: ['height'],
    unit: percentOrPixel
  },
  mw: {
    rules: ['maxWidth'],
    scale: 'width',
    unit: percentOrPixel
  },
  c: {
    rules: ['color'],
    scale: 'color'
  },
  bg: {
    rules: ['background'],
    scale: 'color'
  },
  fw: {
    rules: ['flexWrap']
  },
  ai: {
    rules: ['alignItems']
  },
  jc: {
    rules: ['justifyContent']
  },
  o: {
    rules: ['order'],
    unit: str
  },
  m: {
    rules: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    scale: 'space',
    unit: px
  },
  mt: {
    rules: ['marginTop'],
    scale: 'space',
    unit: px
  },
  mb: {
    rules: ['marginBottom'],
    scale: 'space',
    unit: px
  },
  ml: {
    rules: ['marginLeft'],
    scale: 'space',
    unit: px
  },
  mr: {
    rules: ['marginRight'],
    scale: 'space',
    unit: px
  },
  my: {
    rules: ['marginTop', 'marginBottom'],
    scale: 'space',
    unit: px
  },
  mx: {
    rules: ['marginLeft', 'marginRight'],
    scale: 'space',
    unit: px
  },
  p: {
    rules: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    scale: 'space',
    unit: px
  },
  pt: {
    rules: ['paddingTop'],
    scale: 'space',
    unit: px
  },
  pb: {
    rules: ['paddingBottom'],
    scale: 'space',
    unit: px
  },
  pl: {
    rules: ['paddingLeft'],
    scale: 'space',
    unit: px
  },
  pr: {
    rules: ['paddingRight'],
    scale: 'space',
    unit: px
  },
  py: {
    rules: ['paddingTop', 'paddingBottom'],
    scale: 'space',
    unit: px
  },
  px: {
    rules: ['paddingLeft', 'paddingRight'],
    scale: 'space',
    unit: px
  },
  z: {
    rules: ['zIndex'],
    scale: 'zIndex',
    unit: str
  },
  fs: {
    rules: ['fontSize'],
    scale: 'fontSize'
  },
  ff: {
    rules: ['fontFamily'],
    scale: 'fontFamily'
  },
  fe: {
    rules: ['fontWeight'],
    scale: 'fontWeight'
  },
  ta: {
    rules: ['textAlign']
  },
  lh: {
    rules: ['lineHeight'],
    scale: 'lineHeight'
  }
}

mapping.display = mapping.d
mapping.width = mapping.w
mapping.height = mapping.h
mapping.maxWidth = mapping.mw
mapping.color = mapping.c
mapping.background = mapping.bg
mapping.flexWrap = mapping.fw
mapping.alignItems = mapping.ai
mapping.justifyContent = mapping.jc
mapping.order = mapping.o
mapping.margin = mapping.m
mapping.marginTop = mapping.mt
mapping.marginBottom = mapping.mb
mapping.marginLeft = mapping.ml
mapping.marginRight = mapping.mr
mapping.padding = mapping.p
mapping.paddingTop = mapping.pt
mapping.paddingBottom = mapping.pb
mapping.paddingLeft = mapping.pl
mapping.paddingRight = mapping.pr
mapping.zIndex = mapping.z
mapping.fontSize = mapping.fs
mapping.fontFamily = mapping.ff
mapping.fontWeight = mapping.fe
mapping.textAlign = mapping.ta
mapping.lineHeight = mapping.lh
