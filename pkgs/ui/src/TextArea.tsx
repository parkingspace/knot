import clsx from 'clsx'
import { Accessor, JSX, onMount } from 'solid-js'

type propType = JSX.HTMLAttributes<HTMLDivElement>
type Component = (props: propType & { ref?: HTMLDivElement }) => JSX.Element

const TextArea: Component = (props) => {
  return (
    <div
      id='text-area'
      ref={props.ref}
      class={clsx(
        'w-full flex flex-1 max-h-full justify-center overflow-hidden',
      )}
    >
      {props.children}
    </div>
  )
}

export { TextArea }
