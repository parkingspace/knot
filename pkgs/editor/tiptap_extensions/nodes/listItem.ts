import ListItem from '@tiptap/extension-list-item'
import { applyEditorShortcuts } from '../../features/keymap/editorShortcuts'

export default ListItem
  .extend({
    addKeyboardShortcuts() {
      return applyEditorShortcuts(this)
    },
  })
