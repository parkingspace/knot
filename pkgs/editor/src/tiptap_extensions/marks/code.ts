import Code from '@tiptap/extension-code'
import { applyEditorShortcuts } from '../../features/shortcut/editorShortcuts'

export default Code.extend({
  addKeyboardShortcuts() {
    return applyEditorShortcuts(this)
  },
})
