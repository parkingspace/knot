import Code from '@tiptap/extension-code'
import { applyEditorShortcuts } from '../../features/keymap/editorShortcuts'

export default Code.extend({
  addKeyboardShortcuts() {
    return applyEditorShortcuts(this)
  },
})
