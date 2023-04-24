import { Setter } from 'solid-js'
import tinykeys from 'tinykeys'

export * from './keybindings'
export { KeymapSettingModal } from './keymapSettingModal'
export { WhichKeyModal } from './whichkeyModal'

export function setKeymap(
  opts: { setPressedKey: Setter<string>; toggleKeybindingModal: () => boolean },
) {
  const { setPressedKey, toggleKeybindingModal } = opts
  tinykeys(window, {
    'Control': () => {
      console.log('hello??')
      setPressedKey('ctrl')
    },
    'Control+Shift': () => {
      setPressedKey('ctrl+shift')
      console.log('Control+Shift')
    },
    'k n o t': () => {
      alert('The keys \'k\', \'n\', \'o\', and \'t\' were pressed in order')
    },
    '$mod+/': (event) => {
      event.preventDefault()
      console.log('mod key and / pressed')
    },
    '$mod+Space': event => {
      event.preventDefault()
      toggleKeybindingModal()
    },
  }, {
    event: 'keydown',
  })

  tinykeys(
    window,
    {
      'Control': () => {
        setPressedKey('')
      },
    },
    {
      event: 'keyup',
    },
  )
}
