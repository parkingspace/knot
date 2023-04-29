import Color from '@tiptap/extension-color'
import { applyEditorShortcuts } from '../../features/keymap/editorShortcuts'

export default Color
  .extend({
    addKeyboardShortcuts() {
      return applyEditorShortcuts(this)
    },
  })
  .configure({
    // A list of marks to which the color attribute should be applied to.
    // Default: ['textStyle']
    types: ['textStyle'],
  })
