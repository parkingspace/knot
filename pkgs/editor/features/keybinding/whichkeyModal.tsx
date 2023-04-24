import './whichkeyModal.css'
import { Accessor, For, Show } from 'solid-js'
import { keymapGroup } from './keybindings'

export function WhichKeyModal(props: {
  pressedKey: Accessor<string | undefined>
}) {
  console.log("pressed key? ", props.pressedKey())
  return (
    <Show when={props.pressedKey()}>
      <div class='WhichKey'>
        <span>{props.pressedKey()}</span>
        <For
          each={keymapGroup[props.pressedKey()!]}
          fallback={
            <p>
              <span>No keymaps found</span>
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
