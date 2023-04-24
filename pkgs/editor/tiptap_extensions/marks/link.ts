import Link from '@tiptap/extension-link'

export default Link.extend({
  // https://tiptap.dev/api/marks/link#keyboard-shortcuts
  // Doesn’t have a keyboard shortcut
  addKeyboardShortcuts() {
    return {}
  },
})
