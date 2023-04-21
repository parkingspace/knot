import Highlight from '@tiptap/extension-highlight'

export default Highlight.extend({
  addKeyboardShortcuts() {
    return {
      'Mod-Alt-H': () => this.editor.commands.toggleHighlight(),
    }
  },
})
