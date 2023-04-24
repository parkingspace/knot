import Subscript from '@tiptap/extension-subscript'

export default Subscript.extend({
  addKeyboardShortcuts() {
    return {
      'Mod-,': () => this.editor.commands.toggleSubscript(),
    }
  },
})
