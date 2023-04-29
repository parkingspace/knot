import './whichkeyModal.css'
import { For, Show } from 'solid-js'
import { useWhichkeyState } from './whichkeyStore'

export function WhichKeyModal() {
  const wk = useWhichkeyState()
  if (!wk) { return }
  const { wkKeymap, pressedKey } = wk

  return (
    <Show when={pressedKey()}>
      <div class='WhichKey'>
        <span>{pressedKey()}</span>
        <For
          each={wkKeymap[pressedKey()]}
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
