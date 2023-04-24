import Code from '@tiptap/extension-code'

export default Code.extend({
  addKeyboardShortcuts() {
    return {
      'Mod-i': () => this.editor.commands.toggleCode(),
    }
  },
})
