import Color from '@tiptap/extension-color'

// https://tiptap.dev/api/extensions/color
//
// This extension enables you to set the font color in the editor.
// It uses the TextStyle mark, which renders a <span> tag (and only that).
// The font color is applied as inline style then,
// for example <span style="color: #958DF1">.

export default Color.configure({
  // A list of marks to which the color attribute should be applied to.
  // Default: ['textStyle']
  types: ['textStyle'],
})
