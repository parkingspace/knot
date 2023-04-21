import Strike from '@tiptap/extension-strike'

export default Strike.extend({
  addKeyboardShortcuts() {
    return {
      'Mod-Shift-X': () => this.editor.commands.toggleStrike(),
    }
  },
})
