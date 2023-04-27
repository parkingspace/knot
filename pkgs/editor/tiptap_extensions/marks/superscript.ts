import Superscript from '@tiptap/extension-superscript'
import { applyEditorShortcuts } from '../../features/keymap/editorShortcuts'

export default Superscript.extend({
  addKeyboardShortcuts() {
    return applyEditorShortcuts(this)
  },
})
