import clsx from 'clsx'
import { Accessor, JSX, onMount } from 'solid-js'

type propType = JSX.HTMLAttributes<HTMLDivElement>
type Component = (props: propType & { ref?: HTMLDivElement }) => JSX.Element

const TextArea: Component = (props) => {
  onMount(() => {
    console.log('text area is mounted')
  })
  return (
    <div
      id='text-area'
      class={clsx(
        'w-full flex flex-1 h-screen max-h-full justify-center overflow-hidden',
      )}
    >
      {props.children}
    </div>
  )
}

export { TextArea }
