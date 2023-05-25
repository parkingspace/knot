import OrderedList from '@tiptap/extension-ordered-list'
import { applyEditorShortcuts } from '../../features/shortcut/editorShortcuts'

const orderedList = OrderedList
  .extend({
    addKeyboardShortcuts() {
      return applyEditorShortcuts(this)
    },
  })
  .configure({
    HTMLAttributes: {
      class: 'list-decimal',
    },
    // Decides whether to keep the marks from a previous line
    // after toggling the list either using inputRule or using the button
    // Default: false
    keepMarks: false,

    // Decides whether to keep the attributes from a previous line
    // after toggling the list either using inputRule or using the button
    // Default: false
    keepAttributes: false,
  })

export default orderedList
