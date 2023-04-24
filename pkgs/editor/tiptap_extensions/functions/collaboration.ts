import Collaboration from '@tiptap/extension-collaboration'

// https://tiptap.dev/api/extensions/collaboration
export default Collaboration
  .extend({
    addKeyboardShortcuts() {
      return {
        'Mod-z': () => this.editor.commands.undo(),
        'Mod-Shift-z': () => this.editor.commands.redo(),
        'Mod-y': () => this.editor.commands.redo(),
      }
    },
  })
