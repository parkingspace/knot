import Bold from '@tiptap/extension-bold'
import { applyEditorShortcuts } from '../../features/keymap/editorShortcuts'

export default Bold.extend({
  addKeyboardShortcuts() {
    return applyEditorShortcuts(this)
  },
})
