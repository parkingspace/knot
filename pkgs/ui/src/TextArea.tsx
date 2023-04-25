import { JSX } from 'solid-js'

type propType = JSX.HTMLAttributes<HTMLDivElement>
type Component = (props: propType & { ref?: HTMLDivElement }) => JSX.Element

const TextArea: Component = (props) => {
  return (
    <div
      class='w-full flex flex-grow-0 flex-shrink h-screen max-h-full justify-center overflow-x-hidden overflow-auto'
      ref={props.ref}
    >
      {props.children}
    </div>
  )
}

export { TextArea }
