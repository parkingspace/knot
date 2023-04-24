import Blockquote from '@tiptap/extension-blockquote'

export default Blockquote.configure({}).extend({
  addKeyboardShortcuts() {
    return {
      'Mod-Alt-Q': () => this.editor.commands.toggleBlockquote(),
    }
  },
})
