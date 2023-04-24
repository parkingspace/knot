import BulletList from '@tiptap/extension-bullet-list'

const bulletlist = BulletList
  .extend({
    addKeyboardShortcuts() {
      return {
        'Mod-alt-u': () => this.editor.commands.toggleBulletList(),
      }
    },
  })
  .configure({
    HTMLAttributes: {
      class: 'list-disc',
    },
    // Specify the list item name.
    // Default: 'listItem'
    itemTypeName: 'listItem',

    // Decides whether to keep the marks from a previous line
    // after toggling the list either using inputRule or using the button
    // Default: false
    keepMarks: false,

    // Decides whether to keep the attributes from a previous line
    // after toggling the list either using inputRule or using the button
    // Default: false
    keepAttributes: false,
  })

export default bulletlist
