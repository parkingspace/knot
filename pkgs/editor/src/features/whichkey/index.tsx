import { createContext, createSignal, onMount, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import tinykeys, { KeyBindingMap } from 'tinykeys'

import { editorShortcuts } from '../shortcuts/editorShortcuts'
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
} from './keyNames'

type WkState = ReturnType<typeof createWhichkeyState>
type WkKeymaps = {
  key: string
  description: string
}[]
type WkKeymapStore = {
  [key: string]: WkKeymaps
}

const WhichkeyStateContext = createContext<WkState>()

export const useWhichkeyState = () => useContext(WhichkeyStateContext)

export function WhichkeyStateProvider(props: { children: any }) {
  const wk = createWhichkeyState()
  return (
    <WhichkeyStateContext.Provider value={wk}>
      {props.children}
    </WhichkeyStateContext.Provider>
  )
}

const keyFilterMap = {
  [SHIFT]: (k: string) =>
    !k.includes(MOD) && !k.includes(ALT) && !k.startsWith('Tab'),
  [MOD]: (k: string) => !k.includes(SHIFT) && !k.includes(ALT),
  [MOD_SHIFT]: (k: string) => k.match(/Mod-Shift\-([a-z]|\d|Enter|;|')/),
  [MOD_ALT]: (k: string) => k.match(/Mod-Alt\-([a-z]|\d|Enter)/),
  [ALT]: (k: string) => !k.includes(MOD) && !k.includes(SHIFT),
}

const keyAppendMap: {
  [key: string]: WkKeymaps
} = {
  [MOD]: [
    { key: SHIFT, description: '...' },
    { key: ALT, description: '...' },
  ],
  [ALT]: [
    { key: MOD, description: '...' },
  ],
}

const createWkKeymap = (pk: string) => {
  return [
    ...keyAppendMap[pk] || [],
    ...Object
      .values(editorShortcuts)
      .flat()
      .filter((shortcut) => {
        return shortcut.keys.includes(pk)
            && keyFilterMap[pk]
          ? keyFilterMap[pk](shortcut.keys)
          : false
      })
      .map((shortcut) => ({
        ...shortcut,
        key: shortcut.keys.replace(`${pk}-`, ''),
      })),
  ]
}

function createWhichkeyState() {
  const keysToListen = [ALT, SHIFT, MOD, MOD_SHIFT, MOD_ALT]
  const [pressedKey, setPressedKey] = createSignal<string>('')
  const [wkKeymap, setWkKeymap] = createStore<WkKeymapStore>()

  onMount(() => {
    keysToListen.forEach((key) => {
      setWkKeymap({ ...wkKeymap, [key]: createWkKeymap(key) })
    })
  })

  const wk = {
    pressedKey,
    setPressedKey,
    wkKeymap,
  }
  return wk
}

function listenOnKeydown(keybinding: KeyBindingMap) {
  tinykeys(window, keybinding, { event: 'keydown' })
}
function listenOnKeyup(keybinding: KeyBindingMap) {
  tinykeys(window, keybinding, { event: 'keyup' })
}

export function createWhichKeyListener(
  setPressedKey: (key: string) => void,
) {
  listenOnKeydown({
    ['Tab']: (e) => e.preventDefault(),
    [ALT]: () => setPressedKey(ALT),
    [SHIFT]: () => setPressedKey(SHIFT),
    [OSMOD]: () => setPressedKey(MOD),
    [OSMOD_SHIFT]: () => setPressedKey(MOD_SHIFT),
    [SHIFT_OSMOD]: () => setPressedKey(MOD_SHIFT),
    [OSMOD_ALT]: () => setPressedKey(MOD_ALT),
    [ALT_OSMOD]: () => setPressedKey(MOD_ALT),
  })

  listenOnKeyup({
    [OSMOD_SHIFT]: (e) => {
      if (e.key === SHIFT && e.ctrlKey) {
        setPressedKey(MOD)
      }
    },
    [SHIFT_OSMOD]: (e) => {
      if (e.key === OSMOD && e.shiftKey) {
        setPressedKey(SHIFT)
      }
    },
    [OSMOD_ALT]: (e) => {
      if (e.key === ALT && e.ctrlKey) {
        setPressedKey(MOD)
      }
    },
    [ALT_OSMOD]: (e) => {
      if (e.key === OSMOD && e.altKey) {
        setPressedKey(ALT)
      }
    },
    [OSMOD]: () => setPressedKey(''),
    [SHIFT]: () => setPressedKey(''),
    [ALT]: () => setPressedKey(''),
  })
}
