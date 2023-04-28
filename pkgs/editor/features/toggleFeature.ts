import { Editor } from '@tiptap/core'
import { setKeyboardEventListeners } from './keymap/keymapStore'
import { createKnotCaret } from './knotCaret'
import { createTypewriter } from './typewriter'

export function getUserEditorFeatures() {
  return {
    'whichKey': true,
    'knotCaret': true,
    'typewriter': false,
  }
}

export function initEditorFeatures(
  opts: { [key: string]: boolean },
  editor: Editor,
  keymap: any,
) {
  const { whichKey, knotCaret, typewriter } = opts

  if (knotCaret) {
    let caret = createKnotCaret({ editor })
    if (typewriter) {
      createTypewriter({ editor, caret })
    }
  }
  whichKey && setKeyboardEventListeners(keymap)
}
