/* c8 ignore next */
import { CSSPropertyMapping } from './'

export function px(v: string | number) {
  return typeof v === 'number' ? v + 'px' : v
}

export function str(v: string | number) {
  return v + ''
}

export function percOrPx(v: string | number) {
  return typeof v === 'number' ? (v <= 1 ? v * 100 + '%' : v + 'px') : v
}

export var properties: CSSPropertyMapping = {
  display: {},
  position: {},
  top: {
    token: 'space',
    unit: px,
  },
  bottom: {
    token: 'space',
    unit: px,
  },
  left: {
    token: 'space',
    unit: px,
  },
  right: {
    token: 'space',
    unit: px,
  },
  width: {
    token: 'width',
    unit: percOrPx,
  },
  minWidth: {
    token: 'width',
    unit: percOrPx,
  },
  maxWidth: {
    token: 'width',
    unit: percOrPx,
  },
  height: {
    token: 'height',
    unit: percOrPx,
  },
  minHeight: {
    token: 'height',
    unit: percOrPx,
  },
  maxHeight: {
    token: 'height',
    unit: percOrPx,
  },
  color: {
    token: 'color',
  },
  background: {
    token: 'color',
  },
  backgroundColor: {
    token: 'color',
  },
  backgroundImage: {},
  backgroundRepeat: {},
  backgroundSize: {},
  opacity: {},
  flex: {},
  flexWrap: {},
  alignItems: {},
  alignContent: {},
  justifyItems: {},
  justifyContent: {},
  flexDirection: {},
  flexGrow: {},
  flexShrink: {},
  flexBasis: {},
  justifySelf: {},
  alignSelf: {},
  order: {
    unit: str,
  },
  margin: {
    token: 'space',
    unit: px,
  },
  marginTop: {
    token: 'space',
    unit: px,
  },
  marginBottom: {
    token: 'space',
    unit: px,
  },
  marginLeft: {
    token: 'space',
    unit: px,
  },
  marginRight: {
    token: 'space',
    unit: px,
  },
  padding: {
    token: 'space',
    unit: px,
  },
  paddingTop: {
    token: 'space',
    unit: px,
  },
  paddingBottom: {
    token: 'space',
    unit: px,
  },
  paddingLeft: {
    token: 'space',
    unit: px,
  },
  paddingRight: {
    token: 'space',
    unit: px,
  },
  zIndex: {
    token: 'zIndex',
    unit: str,
  },
  fontSize: {
    token: 'fontSize',
  },
  fontFamily: {
    token: 'fontFamily',
  },
  fontWeight: {
    token: 'fontWeight',
    unit: str,
  },
  lineHeight: {
    token: 'lineHeight',
  },
  letterSpacing: {
    token: 'letterSpacing',
  },
  textAlign: {},
  overflow: {},
  boxShadow: {
    token: 'boxShadow',
  },
  border: {
    token: 'border',
  },
  borderColor: {
    token: 'color',
  },
  borderWidth: {
    token: 'borderWidth',
  },
  borderStyle: {
    token: 'borderStyle',
  },
  borderRadius: {
    token: 'borderRadius',
  },
  fill: {
    token: 'color',
  },
  stroke: {
    token: 'color',
  },
  transition: {
    token: 'transition',
  },
  transitionProperty: {},
  transitionDuration: {
    token: 'transitionDuration',
  },
  transitionTimingFunction: {
    token: 'transitionTimingFunction',
  },
  transform: {},
}
