import TextAlign from '@tiptap/extension-text-align'

export default TextAlign
  .configure({
    // A list of nodes where the text align attribute should be applied to.
    // Default: []
    types: ['heading', 'paragraph'],

    // A list of available options for the text align attribute.
    // Default: ['left', 'center', 'right', 'justify']
    alignments: ['left', 'center', 'right', 'justify'],

    // The default text align.
    //
    // Default: 'left'
    defaultAlignment: 'left',
  })
  .extend({
    addKeyboardShortcuts() {
      return {
        'Mod-Alt-L': () => this.editor.commands.setTextAlign('left'),
        'Mod-Alt-E': () => this.editor.commands.setTextAlign('center'),
        'Mod-Alt-R': () => this.editor.commands.setTextAlign('right'),
        'Mod-Alt-J': () => this.editor.commands.setTextAlign('justify'),
      }
    },
  })
