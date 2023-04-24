import Bold from '@tiptap/extension-bold'

export default Bold.extend({
  addKeyboardShortcuts() {
    return {
      'Mod-b': () => this.editor.commands.toggleBold(),
    }
  },
})
