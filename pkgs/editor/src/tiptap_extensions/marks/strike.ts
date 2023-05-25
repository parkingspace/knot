import Strike from '@tiptap/extension-strike'
import { applyEditorShortcuts } from '../../features/shortcut/editorShortcuts'

export default Strike.extend({
  addKeyboardShortcuts() {
    return applyEditorShortcuts(this)
  },
})
