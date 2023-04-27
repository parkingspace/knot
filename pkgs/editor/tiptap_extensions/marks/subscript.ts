import Subscript from '@tiptap/extension-subscript'
import { applyEditorShortcuts } from '../../features/keymap/editorShortcuts'

export default Subscript.extend({
  addKeyboardShortcuts() {
    return applyEditorShortcuts(this)
  },
})
