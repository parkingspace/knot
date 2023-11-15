import { onMount } from 'solid-js'
import caret from './caretState'

export function Caret() {
  const { setCaret, style } = caret

  onMount(() => {
    setCaret(document.getElementById('caret'))
  })

  return (
    <div
      id='caret'
      class={style}
    />
  )
}
