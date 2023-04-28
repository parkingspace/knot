import { Editor } from '@tiptap/core'
import { createContext, createEffect, createSignal, useContext } from 'solid-js'
import tinykeys from 'tinykeys'

import { editorShortcuts } from './editorShortcuts'
import {
  ALT,
  ALT_OSMOD,
  MOD,
  MOD_ALT,
  MOD_SHIFT,
  OSMOD,
  OSMOD_ALT,
  OSMOD_SHIFT,
  SHIFT,
  SHIFT_OSMOD,
} from './keymapConstants'

type EditorKeymap = ReturnType<typeof createEditorKeymap>
const EditorKeymapContext = createContext<EditorKeymap>()

export const useEditorKeymap = () => useContext(EditorKeymapContext)

export function EditorKeymapProvider(props: { children: any }) {
  const keymap = createEditorKeymap()
  return (
    <EditorKeymapContext.Provider value={keymap}>
      {props.children}
    </EditorKeymapContext.Provider>
  )
}

function createEditorKeymap() {
  const [pressedKey, setPressedKey] = createSignal<string>('')
  const [keymaps, setKeymaps] = createSignal<any[]>([])
  const [editorState, setEditorState] = createSignal<Editor | null>(null)

  createEffect(() => {
    setKeymaps(createWhichkeyMaps(pressedKey()))
  })

  const createWhichkeyMaps = (pressed: string) => {
    let keymapsToAppend: any[] = []
    if (pressed === MOD) {
      keymapsToAppend = [
        { key: SHIFT, description: '...' },
        { key: ALT, description: '...' },
      ]
    } else if (pressed === ALT) {
      keymapsToAppend = [
        { key: MOD, description: '...' },
      ]
    }
    return [
      ...keymapsToAppend,
      ...Object
        .entries(editorShortcuts)
        .filter((val) => {
          return val[1].filter((val) => val.key.includes(pressed)).length > 0
        })
        .map((val) => {
          return val[1]
            .filter((val) => {
              if (pressed === SHIFT) {
                return !val.key.includes(MOD)
                  && !val.key.includes(ALT)
                  && !val.key.startsWith('Tab')
              }
              if (pressed === MOD) {
                return !val.key.includes(SHIFT)
                  && !val.key.includes(ALT)
              }
              if (pressed === MOD_SHIFT) {
                return val.key.match(/Mod-Shift\-([a-z]|\d|Enter)/)
              }
              if (pressed === MOD_ALT) {
                return val.key.match(/Mod-Alt\-([a-z]|\d|Enter)/)
              }
              if (pressed === ALT) {
                return !val.key.includes(MOD)
                  && !val.key.includes(SHIFT)
              }
            })
            .map((val) => {
              const newKey = val.key.replace(`${pressed}-`, '')
              return { ...val, key: newKey }
            })
        })
        .flat(),
    ]
  }

  const keymap = {
    pressedKey,
    setPressedKey,
    keymaps,
    setKeymaps,
  }
  return keymap
}

export function setKeyboardEventListeners(
  keymap?: ReturnType<typeof createEditorKeymap>,
) {
  if (!keymap) { return }
  const { setPressedKey } = keymap

  tinykeys(window, {
    [ALT]: () => {
      return setPressedKey(ALT)
    },
    [SHIFT]: () => {
      return setPressedKey(SHIFT)
    },
    [OSMOD]: () => {
      return setPressedKey(MOD)
    },
    [OSMOD_SHIFT]: () => {
      return setPressedKey(MOD_SHIFT)
    },
    [SHIFT_OSMOD]: () => {
      return setPressedKey(MOD_SHIFT)
    },
    [OSMOD_ALT]: () => {
      return setPressedKey(MOD_ALT)
    },
    [ALT_OSMOD]: () => {
      return setPressedKey(MOD_ALT)
    },
  }, {
    event: 'keydown',
  })

  tinykeys(
    window,
    {
      [OSMOD_SHIFT]: (e) => {
        if (e.key === SHIFT && e.ctrlKey) {
          return setPressedKey(MOD)
        }
      },
      [SHIFT_OSMOD]: (e) => {
        if (e.key === OSMOD && e.shiftKey) {
          return setPressedKey(SHIFT)
        }
      },
      [OSMOD_ALT]: (e) => {
        if (e.key === ALT && e.ctrlKey) {
          return setPressedKey(MOD)
        }
      },
      [ALT_OSMOD]: (e) => {
        if (e.key === OSMOD && e.altKey) {
          return setPressedKey(ALT)
        }
      },
      [OSMOD]: (e) => {
        return setPressedKey('')
      },
      [SHIFT]: (e) => {
        return setPressedKey('')
      },
      [ALT]: (e) => {
        return setPressedKey('')
      },
    },
    {
      event: 'keyup',
    },
  )
}
