import Highlight from '@tiptap/extension-highlight'
import { applyEditorShortcuts } from '../../features/keymap/editorShortcuts'

export default Highlight.extend({
  addKeyboardShortcuts() {
    return applyEditorShortcuts(this)
  },
})
