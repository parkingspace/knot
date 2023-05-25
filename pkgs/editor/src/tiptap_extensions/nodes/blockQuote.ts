import Blockquote from '@tiptap/extension-blockquote'
import { applyEditorShortcuts } from '../../features/shortcut/editorShortcuts'

export default Blockquote.extend({
  addKeyboardShortcuts() {
    return applyEditorShortcuts(this)
  },
})
