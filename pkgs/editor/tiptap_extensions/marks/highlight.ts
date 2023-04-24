import Highlight from '@tiptap/extension-highlight'

export default Highlight.extend({
  addKeyboardShortcuts() {
    return {
      'Mod-Alt-h': () => this.editor.commands.toggleHighlight(),
    }
  },
})
