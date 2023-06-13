import {
  createContext,
  createSignal,
  For,
  onMount,
  Show,
  useContext,
} from 'solid-js'
import { createStore } from 'solid-js/store'
import tinykeys, { KeyBindingMap } from 'tinykeys'

import clsx from 'clsx'
import { editorShortcuts } from '../shortcut/editorShortcuts'
import {
  ALT,
  ALT_OSMOD,
  MOD,
  MOD_ALT,
  MOD_SHIFT,
  OSMOD,
  OSMOD_ALT,
  OSMOD_NAME,
  OSMOD_SHIFT,
  SHIFT,
  SHIFT_OSMOD,
  USER_OS,
} from './keyNames'

type ListeningKey =
  | typeof ALT
  | typeof SHIFT
  | typeof MOD
  | typeof MOD_SHIFT
  | typeof MOD_ALT

type WkState = ReturnType<typeof createWhichkeyState>
type WkKeymaps = {
  key: string
  description: string
}[]
type WkKeymapStore = {
  [key: string]: WkKeymaps
}

const WhichkeyStateContext = createContext<WkState>()

export const useWhichkeyState = () => {
  const context = useContext(WhichkeyStateContext)
  if (!context) {
    throw new Error('useWhichkeyState must be used within WKProvider')
  }
  return context
}

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
    { key: OSMOD_NAME, description: '...' },
  ],
}

const createWkKeymap = (pk: ListeningKey) => {
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

export function initWhichkey() {
  const { setPressedKey, pressedKey, wkKeymap } = useWhichkeyState()

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

  return (
    <Show when={pressedKey()}>
      <div
        class={clsx(
          'z-50 absolute flex flex-col gap-1 bottom-0 right-0 p-3 bg-sidebarBg text-editorFg border-editorFg rounded border m-5 text-sm select-none',
        )}
      >
        <span class='text-center border-0 inline-block min-w-3 p-1'>
          {pressedKey().replace('Mod', OSMOD_NAME)}
        </span>
        <For
          each={wkKeymap[pressedKey()]}
          fallback={
            <p>
              <span>No keymaps are found</span>
            </p>
          }
        >
          {(map) => (
            <p class='flex flex-row justify-between py-1'>
              <span class='min-w-[2em] p-[0.2em] mr-5'>{map.key}</span>
              <span class='p-[0.2em]'>{map.description}</span>
            </p>
          )}
        </For>
      </div>
    </Show>
  )
}
