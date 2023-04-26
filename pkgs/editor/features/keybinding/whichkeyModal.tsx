import './whichkeyModal.css'
import { For, Show } from 'solid-js'
import { useEditorKeymap } from './keymapStore'

export function WhichKeyModal() {
  const keymap = useEditorKeymap()
  if (!keymap) return
  const { keymaps, pressedKey } = keymap

  return (
    <Show when={pressedKey()}>
      <div class='WhichKey'>
        <span>{pressedKey()}</span>
        <For
          each={keymaps()}
          fallback={
            <p>
              <span>No keymaps are found</span>
            </p>
          }
        >
          {(map) => (
            <p>
              <span>{map.key}</span> <span>{map.description}</span>
            </p>
          )}
        </For>
      </div>
    </Show>
  )
}
