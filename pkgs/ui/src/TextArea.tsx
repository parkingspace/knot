import { JSX } from 'solid-js'

type propType = JSX.HTMLAttributes<HTMLDivElement>
type Component = (props: propType & { ref?: HTMLDivElement }) => JSX.Element

const TextArea: Component = (props) => {
  return (
    <div class='h-full p-0 m-0' ref={props.ref}>
      {props.children}
    </div>
  )
}

export { TextArea }
