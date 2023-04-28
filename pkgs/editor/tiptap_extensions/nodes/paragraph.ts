import Paragraph from '@tiptap/extension-paragraph'
import { applyEditorShortcuts } from '../../features/keymap/editorShortcuts'

export default Paragraph
  .extend({
    addKeyboardShortcuts() {
      return applyEditorShortcuts(this)
    },
  })
