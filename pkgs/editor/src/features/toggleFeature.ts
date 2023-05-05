import { Editor } from '@tiptap/core'
import { createWkKeyListeners } from './keymap/whichkeyStore'
import { createKnotCaret } from './knotCaret'
import { createTypewriter } from './typewriter'

type EditorFeature = 'whichkey' | 'knotCaret' | 'typewriter'
type EditorFeatures = { [key in EditorFeature]: boolean }

// TODO: make this configurable
export function getUserEditorFeatures() {
  return {
    'whichkey': true,
    'knotCaret': true,
    'typewriter': false,
  }
}

export function initEditorFeatures(
  opts: EditorFeatures,
  editor: Editor,
  setPressedKey?: (key: string) => void | undefined,
) {
  const { whichkey, knotCaret, typewriter } = opts

  if (knotCaret) {
    let caret = createKnotCaret({ editor })
    if (typewriter) {
      createTypewriter({ editor, caret })
    }
  }

  if (setPressedKey && whichkey) {
    createWkKeyListeners(setPressedKey)
  }
}
