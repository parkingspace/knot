import Blockquote from '@tiptap/extension-blockquote'
import { applyEditorShortcuts } from '../../features/keymap/editorShortcuts'

export default Blockquote.extend({
  addKeyboardShortcuts() {
    return applyEditorShortcuts(this)
  },
})
