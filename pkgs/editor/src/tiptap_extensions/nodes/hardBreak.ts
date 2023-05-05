import { HardBreak } from '@tiptap/extension-hard-break'
import { applyEditorShortcuts } from '../../features/keymap/editorShortcuts'

const hardBreak = HardBreak.extend({
  addKeyboardShortcuts() {
    return applyEditorShortcuts(this)
  },
})

export default hardBreak
