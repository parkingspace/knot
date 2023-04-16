import { JSX } from 'solid-js'

type propType = JSX.HTMLAttributes<HTMLDivElement>
type Component = (props: propType & { ref?: HTMLDivElement }) => JSX.Element

const TextArea: Component = (props) => {
  return (
    <div class='text-emerald-400 text-2xl' ref={props.ref}>
      <p>hi from text area</p>
      {props.children}
    </div>
  )
}

export { TextArea }
