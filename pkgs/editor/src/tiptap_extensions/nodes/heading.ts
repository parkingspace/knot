import Heading from '@tiptap/extension-heading'
import { applyEditorShortcuts } from '../../features/keymap/editorShortcuts'

export default Heading
  .extend({
    addKeyboardShortcuts() {
      return applyEditorShortcuts(this)
    },
  })
  .configure({
    levels: [1, 2, 3],
  })
