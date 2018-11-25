const alignSelf = value => ({alignSelf: value})
alignSelf.auto = alignSelf('auto')
alignSelf.baseline = alignSelf('baseline')
alignSelf.center = alignSelf('center')
alignSelf.flexEnd = alignSelf('flex-end')
alignSelf.flexStart = alignSelf('flex-start')
alignSelf.inherit = alignSelf('inherit')
alignSelf.initial = alignSelf('initial')
alignSelf.stretch = alignSelf('stretch')

const background = value => ({background: value})
background.none = background('none')
background.transparent = background('transparent')

const backgroundClip = value => ({backgroundClip: value})
const backgroundColor = value => ({backgroundColor: value})

const border = value => ({border: value})
const borderBottom = value => ({borderBottom: value})
const borderLeft = value => ({borderLeft: value})
const borderRadius = value => ({borderRadius: value})
const borderRight = value => ({borderRight: value})
const borderTop = value => ({borderTop: value})

const color = value => ({color: value})
const content = value => ({content: value})

const cursor = value => ({cursor: value})
cursor.pointer = cursor('pointer')

const display = value => ({display: value})
display.block = display('block')
display.flex = display('flex')
display.inline = display('inline')
display.inlineBlock = display('inline-block')

const flex = value => ({flex: value})

const flexBasis = value => ({flexBasis: value})

const flexDirection = value => ({flexDirection: value})
flexDirection.row = flexDirection('row')
flexDirection.rowReverse = flexDirection('row-reverse')
flexDirection.column = flexDirection('column')
flexDirection.columnReverse = flexDirection('column-reverse')
flexDirection.initial = flexDirection('initial')
flexDirection.inherit = flexDirection('inherit')

const flexGrow = value => ({flexGrow: value})
const flexShrink = value => ({flexShrink: value})

const flexWrap = value => ({flexWrap: value})
flexWrap.nowrap = flexWrap('nowrap')
flexWrap.wrap = flexWrap('wrap')
flexWrap.wrapReverse = flexWrap('wrap-reverse')
flexWrap.initial = flexWrap('initial')
flexWrap.inherit = flexWrap('inherit')

const fontFamily = value => ({fontFamily: value})
const fontSize = value => ({fontSize: value})
const fontWeight = value => ({fontWeight: value})

const height = value => ({height: value})

const justifyContent = value => ({justifyContent: value})
justifyContent.flexStart = justifyContent('flex-start')
justifyContent.flexEnd = justifyContent('flex-end')
justifyContent.center = justifyContent('center')
justifyContent.spaceBetween = justifyContent('space-between')
justifyContent.spaceAround = justifyContent('space-around')
justifyContent.initial = justifyContent('initial')
justifyContent.inherit = justifyContent('inherit')

const left = value => ({left: value})

const letterSpacing = value => ({letterSpacing: value})
const lineHeight = value => ({lineHeight: value})

const listStyle = value => ({listStyle: value})
listStyle.none = listStyle('none')

const margin = value => ({margin: value})
const marginBottom = value => ({marginBottom: value})
const marginLeft = value => ({marginLeft: value})
const marginRight = value => ({marginRight: value})
const marginTop = value => ({marginTop: value})

const maxHeight = value => ({maxHeight: value})
const minHeight = value => ({minHeight: value})

const maxWidth = value => ({maxWidth: value})
const minWidth = value => ({minWidth: value})

const opacity = value => ({opacity: value})
const outline = value => ({outline: value})

const padding = value => ({padding: value})
const paddingBottom = value => ({paddingBottom: value})
const paddingLeft = value => ({paddingLeft: value})
const paddingRight = value => ({paddingRight: value})
const paddingTop = value => ({paddingTop: value})

const position = value => ({position: value})
position.absolute = position('absolute')
position.relative = position('relative')
position.fixed = position('fixed')
position.static = position('static')
position.sticky = position('sticky')

const textAlign = value => ({textAlign: value})
textAlign.center = textAlign('center')
textAlign.left = textAlign('left')
textAlign.right = textAlign('right')

const textDecoration = value => ({textDecoration: value})
textDecoration.none = textDecoration('none')
textDecoration.underline = textDecoration('underline')

const transform = value => ({transform: value})
const transition = value => ({transition: value})

const top = value => ({top: value})

const verticalAlign = value => ({verticalAlign: value})
verticalAlign.middle = verticalAlign('middle')

const width = value => ({width: value})

const whiteSpace = value => ({whiteSpace: value})
whiteSpace.normal = whiteSpace('normal')
whiteSpace.nowrap = whiteSpace('nowrap')

module.exports = {
  alignSelf,

  background,
  backgroundClip,
  backgroundColor,

  border,
  borderBottom,
  borderLeft,
  borderRadius,
  borderRight,
  borderTop,

  color,
  cursor,
  content,

  display,
  flex,
  flexBasis,
  flexDirection,
  flexGrow,
  flexShrink,
  flexWrap,
  fontFamily,
  fontSize,
  fontWeight,
  height,
  justifyContent,

  left,

  letterSpacing,
  lineHeight,

  listStyle,

  margin,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,

  maxHeight,
  minHeight,
  maxWidth,
  minWidth,

  opacity,
  outline,

  padding,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  position,

  textAlign,
  textDecoration,

  transform,
  transition,

  top,

  verticalAlign,

  width,
  whiteSpace,
}
