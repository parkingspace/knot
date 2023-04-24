import Strike from '@tiptap/extension-strike'

export default Strike
.extend({
  addKeyboardShortcuts() {
    return {
      'Mod-Shift-x': () => this.editor.commands.toggleStrike(),
    }
  },
})
