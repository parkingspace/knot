import BulletList from '@tiptap/extension-bullet-list'

export default BulletList
  .configure({
    // Specify the list item name.
    // Default: 'listItem'
    itemTypeName: 'listItem',

    // Decides whether to keep the marks from a previous line
    // after toggling the list either using inputRule or using the button
    // Default: false
    keepMarks: true,

    // Decides whether to keep the attributes from a previous line
    // after toggling the list either using inputRule or using the button
    // Default: false
    keepAttributes: true,
  })
  .extend({
    addKeyboardShortcuts() {
      return {
        'Mod-Alt-8': () => this.editor.commands.toggleBulletList(),
      }
    },
  })
