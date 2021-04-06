const { px, str, percOrPx } = require('./utils')

module.exports = {
  display: {
    properties: ['display']
  },
  position: {
    properties: ['position']
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
  width: {
    properties: ['width'],
    token: 'width',
    unit: percOrPx
  },
  minWidth: {
    properties: ['minWidth'],
    token: 'width',
    unit: percOrPx
  },
  maxWidth: {
    properties: ['maxWidth'],
    token: 'width',
    unit: percOrPx
  },
  height: {
    properties: ['height'],
    token: 'height',
    unit: percOrPx
  },
  minHeight: {
    properties: ['minHeight'],
    token: 'height',
    unit: percOrPx
  },
  maxHeight: {
    properties: ['maxHeight'],
    token: 'height',
    unit: percOrPx
  },
  color: {
    properties: ['color'],
    token: 'color'
  },
  background: {
    properties: ['background'],
    token: 'color'
  },
  opacity: {
    properties: ['opacity']
  },
  flex: {
    properties: ['flex']
  },
  flexWrap: {
    properties: ['flexWrap']
  },
  alignItems: {
    properties: ['alignItems']
  },
  alignContent: {
    properties: ['alignContent']
  },
  justifyItems: {
    properties: ['justifyItems']
  },
  justifyContent: {
    properties: ['justifyContent']
  },
  flexDirection: {
    properties: ['flexDirection']
  },
  flexGrow: {
    properties: ['flexGrow']
  },
  flexShrink: {
    properties: ['flexShrink']
  },
  flexBasis: {
    properties: ['flexBasis']
  },
  justifySelf: {
    properties: ['justifySelf']
  },
  alignSelf: {
    properties: ['alignSelf']
  },
  order: {
    properties: ['order'],
    unit: str
  },
  margin: {
    properties: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    token: 'space',
    unit: px
  },
  marginTop: {
    properties: ['marginTop'],
    token: 'space',
    unit: px
  },
  marginBottom: {
    properties: ['marginBottom'],
    token: 'space',
    unit: px
  },
  marginLeft: {
    properties: ['marginLeft'],
    token: 'space',
    unit: px
  },
  marginRight: {
    properties: ['marginRight'],
    token: 'space',
    unit: px
  },
  padding: {
    properties: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    token: 'space',
    unit: px
  },
  paddingTop: {
    properties: ['paddingTop'],
    token: 'space',
    unit: px
  },
  paddingBottom: {
    properties: ['paddingBottom'],
    token: 'space',
    unit: px
  },
  paddingLeft: {
    properties: ['paddingLeft'],
    token: 'space',
    unit: px
  },
  paddingRight: {
    properties: ['paddingRight'],
    token: 'space',
    unit: px
  },
  zIndex: {
    properties: ['zIndex'],
    token: 'zIndex',
    unit: str
  },
  fontSize: {
    properties: ['fontSize'],
    token: 'fontSize'
  },
  fontFamily: {
    properties: ['fontFamily'],
    token: 'fontFamily'
  },
  fontWeight: {
    properties: ['fontWeight'],
    token: 'fontWeight',
    unit: str
  },
  lineHeight: {
    properties: ['lineHeight'],
    token: 'lineHeight'
  },
  letterSpacing: {
    properties: ['letterSpacing'],
    token: 'letterSpacing'
  },
  textAlign: {
    properties: ['textAlign']
  },
  overflow: {
    properties: ['overflow']
  },
  boxShadow: {
    properties: ['boxShadow'],
    token: 'boxShadow'
  },
  border: {
    properties: ['border'],
    token: 'border'
  },
  borderColor: {
    properties: ['borderColor'],
    token: 'color'
  },
  borderWidth: {
    properties: ['borderWidth'],
    token: 'borderWidth'
  },
  borderStyle: {
    properties: ['borderStyle'],
    token: 'borderStyle'
  },
  borderRadius: {
    properties: ['borderRadius'],
    token: 'borderRadius'
  },
  fill: {
    properties: ['fill'],
    token: 'color'
  },
  stroke: {
    properties: ['stroke'],
    token: 'color'
  },
  transition: {
    properties: ['transition'],
    token: 'transition'
  },
  transitionProperty: {
    properties: ['transitionProperty']
  },
  transitionDuration: {
    properties: ['transitionDuration'],
    token: 'transitionDuration'
  },
  transitionTimingFunction: {
    properties: ['transitionTimingFunction'],
    token: 'transitionTimingFunction'
  },
  transform: {
    properties: ['transform']
  }
}
