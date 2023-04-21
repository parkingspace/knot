import OrderedList from '@tiptap/extension-ordered-list'

export default OrderedList
  .configure({
    // Decides whether to keep the marks from a previous line
    // after toggling the list either using inputRule or using the button
    // Default: false
    keepMarks: true,

    // Decides whether to keep the attributes from a previous line
    // after toggling the list either using inputRule or using the button
    // Default: false
    keepAttributes: true,
  })
  .extend({
    addKeyboardShortcuts() {
      return {
        'Mod-Shift-7': () => this.editor.commands.toggleOrderedList(),
      }
    },
  })
