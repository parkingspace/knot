import Link from '@tiptap/extension-link'
import { applyEditorShortcuts } from '../../features/keymap/editorShortcuts'

export default Link.extend({
  // TODO: https://tiptap.dev/api/marks/link#keyboard-shortcuts
  addKeyboardShortcuts() {
    return applyEditorShortcuts(this)
  },
})
