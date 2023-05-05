import FontFamily from '@tiptap/extension-font-family'
// This extension enables you to set the font family in the editor.
// It uses the TextStyle mark, which renders a <span> tag.
// The font family is applied as inline style,
// for example <span style="font-family: Arial">.

export default FontFamily.configure({
  // A list of marks to which the font family attribute should be applied to.
  //
  // Default: ['textStyle']
  types: ['textStyle'],
})
