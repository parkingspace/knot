import Superscript from '@tiptap/extension-superscript'

export default Superscript.extend({
  addKeyboardShortcuts() {
    return {
      'Mod-.': () => this.editor.commands.toggleSuperscript(),
    }
  },
})
