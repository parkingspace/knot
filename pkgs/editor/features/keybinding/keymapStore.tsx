import { Editor } from '@tiptap/core'
import { createContext, createEffect, createSignal, useContext } from 'solid-js'
import tinykeys from 'tinykeys'
import { editorShortcuts } from '.'

const KeymapContext = createContext<ReturnType<typeof createKeymap>>()

export function KeymapProvider(props: { children: any }) {
  const keymap = createKeymap()
  return (
    <KeymapContext.Provider value={keymap}>
      {props.children}
    </KeymapContext.Provider>
  )
}

export const useEditorKeymap = () => useContext(KeymapContext)

function createKeymap() {
  const [pressedKey, setPressedKey] = createSignal<string>('')
  const [keymaps, setKeymaps] = createSignal<any[]>([])

  createEffect(() => {
    const k = pressedKey()
    setKeymaps(createWhichkeyMaps(k))
  })

  const createWhichkeyMaps = (keyname: string) => {
    let keymapsToAppend: any[] = []
    if (keyname === 'Mod') {
      keymapsToAppend = [
        { key: 'Shift', description: '...' },
        { key: 'Alt', description: '...' },
      ]
    } else if (keyname === 'Alt') {
      keymapsToAppend = [
        { key: 'Mod', description: '...' },
      ]
    }
    return [
      ...keymapsToAppend,
      ...Object
        .entries(editorShortcuts)
        .filter((val) => {
          return val[1].filter((val) => val.key.includes(keyname)).length > 0
        })
        .map((val) => {
          return val[1]
            .filter((val) => {
              if (keyname === 'Mod') {
                return !val.key.includes('Shift')
                  && !val.key.includes('Alt')
              }
              if (keyname === 'Mod-Shift') {
                return val.key.match(/Mod-Shift\-([a-z]|\d)/)
              }
              if (keyname === 'Mod-Alt') {
                return val.key.match(/Mod-Alt\-([a-z]|\d)/)
              }
              if (keyname === 'Alt') {
                return !val.key.includes('Mod')
                  && !val.key.includes('Shift')
              }
            })
            .map((val) => {
              const newKey = val.key.replace(`${keyname}-`, '')
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

export function createEditorKeymap(
  editor: Editor,
  keymap: ReturnType<typeof createKeymap>,
) {
  if (!keymap) { return }
  const { setPressedKey } = keymap
  const userOS = navigator.userAgent.includes('Macintosh') ? 'mac' : 'windows'
  const modKey = userOS === 'mac' ? 'Meta' : 'Control'
  const shiftKey = 'Shift'
  const altKey = 'Alt'

  const modShiftKey = `${modKey}+${shiftKey}`
  const shiftModKey = `${shiftKey}+${modKey}`
  const modAltKey = `${modKey}+${altKey}`
  const altModKey = `${altKey}+${modKey}`

  tinykeys(window, {
    [altKey]: () => {
      return setPressedKey('Alt')
    },
    [shiftKey]: () => {
      return setPressedKey('Shift')
    },
    [modKey]: () => {
      return setPressedKey('Mod')
    },
    [modShiftKey]: () => {
      return setPressedKey('Mod-Shift')
    },
    [shiftModKey]: () => {
      return setPressedKey('Mod-Shift')
    },
    [modAltKey]: () => {
      return setPressedKey('Mod-Alt')
    },
    [altModKey]: () => {
      return setPressedKey('Mod-Alt')
    },
  }, {
    event: 'keydown',
  })

  tinykeys(
    window,
    {
      [modShiftKey]: (e) => {
        if (e.key === shiftKey && e.ctrlKey) {
          return setPressedKey('Mod')
        }
      },
      [shiftModKey]: (e) => {
        if (e.key === modKey && e.shiftKey) {
          return setPressedKey('Shift')
        }
      },
      [modAltKey]: (e) => {
        if (e.key === altKey && e.ctrlKey) {
          return setPressedKey('Mod')
        }
      },
      [altModKey]: (e) => {
        if (e.key === modKey && e.altKey) {
          return setPressedKey('Alt')
        }
      },
      [modKey]: (e) => {
        return setPressedKey('')
      },
      [shiftKey]: (e) => {
        return setPressedKey('')
      },
      [altKey]: (e) => {
        return setPressedKey('')
      },
    },
    {
      event: 'keyup',
    },
  )
}
