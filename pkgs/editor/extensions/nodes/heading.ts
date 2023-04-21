import Heading from '@tiptap/extension-heading'

export default Heading
  .configure({
    // Specifies which heading levels are supported.
    // Default: [1, 2, 3, 4, 5, 6]
    levels: [1, 2],
  })
  .extend({
    addKeyboardShortcuts() {
      return {
        'Mod-Alt-1': () => this.editor.commands.setHeading({ level: 1 }),
        'Mod-Alt-2': () => this.editor.commands.setHeading({ level: 2 }),
      }
    },
  })
