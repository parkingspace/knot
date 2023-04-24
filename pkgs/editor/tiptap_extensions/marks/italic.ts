import Italic from '@tiptap/extension-italic'

export default Italic.extend({
  addKeyboardShortcuts() {
    return {
      'Mod-i': () => this.editor.commands.toggleItalic(),
    }
  },
})
