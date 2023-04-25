import { JSX } from 'solid-js'

type propType = JSX.HTMLAttributes<HTMLDivElement>
type Component = (props: propType & { ref?: HTMLDivElement }) => JSX.Element

const TextArea: Component = (props) => {
  return (
    <div
      class='w-full h-full flex justify-center overflow-auto'
      ref={props.ref}
    >
      {props.children}
    </div>
  )
}

export { TextArea }
