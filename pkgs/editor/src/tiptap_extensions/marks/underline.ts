import Underline from '@tiptap/extension-underline'
import { applyEditorShortcuts } from '../../features/keymap/editorShortcuts'

export default Underline.extend({
  addKeyboardShortcuts() {
    return applyEditorShortcuts(this)
  },
})
