import Italic from '@tiptap/extension-italic'
import { applyEditorShortcuts } from '../../features/keymap/editorShortcuts'

export default Italic.extend({
  addKeyboardShortcuts() {
    return applyEditorShortcuts(this)
  },
})
