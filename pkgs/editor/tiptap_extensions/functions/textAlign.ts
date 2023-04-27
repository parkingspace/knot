import TextAlign from '@tiptap/extension-text-align'
import { applyEditorShortcuts } from '../../features/keymap/editorShortcuts'

export default TextAlign
  .extend({
    addKeyboardShortcuts() {
      return applyEditorShortcuts(this)
    },
  })
  .configure({
    types: ['heading', 'paragraph'],
  })
