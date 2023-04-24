import OrderedList from '@tiptap/extension-ordered-list'

const orderedList = OrderedList
  .extend({
    addKeyboardShortcuts() {
      return {
        'Mod-alt-o': () => this.editor.commands.toggleOrderedList(),
      }
    },
  })
  .configure({
    HTMLAttributes: {
      class: 'list-decimal',
    },
    // Decides whether to keep the marks from a previous line
    // after toggling the list either using inputRule or using the button
    // Default: false
    keepMarks: true,

    // Decides whether to keep the attributes from a previous line
    // after toggling the list either using inputRule or using the button
    // Default: false
    keepAttributes: true,
  })

export default orderedList
