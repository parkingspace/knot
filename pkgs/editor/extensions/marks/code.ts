import Code from '@tiptap/extension-code'

export default Code.extend({
  addKeyboardShortcuts() {
    return {
      'Mod-Alt-C': () => this.editor.commands.toggleCode(),
    }
  },
})
