import type { Editor } from '@tiptap/core'
import type { Node } from '@tiptap/pm/model'

import Placeholder from '@tiptap/extension-placeholder'

// https://tiptap.dev/api/extensions/placeholder
export default Placeholder.configure({
  showOnlyWhenEditable: true,
  showOnlyCurrent: true,
  includeChildren: true,

  // The added CSS class if the editor is empty.
  emptyEditorClass: 'is-editor-empty',
  // The added CSS class if the node is empty.
  emptyNodeClass: 'is-empty',

  // The placeholder text added as data-placeholder attribute.
  placeholder: (props: {
    editor: Editor
    node: Node
    pos: number
    hasAnchor: boolean
  }) => {
    if (props.node.type.name === 'heading') {
      return 'Default title'
    }
    return 'Default content'
  },
})
