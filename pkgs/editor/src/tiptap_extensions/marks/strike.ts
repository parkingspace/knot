import Strike from '@tiptap/extension-strike'
import { applyEditorShortcuts } from '../../features/keymap/editorShortcuts'

export default Strike.extend({
  addKeyboardShortcuts() {
    return applyEditorShortcuts(this)
  },
})
