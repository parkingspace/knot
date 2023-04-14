import { JSX } from 'solid-js'
import { textarea } from './.css'

type propType = JSX.HTMLAttributes<HTMLDivElement>
type Component = (props: propType & { ref?: HTMLDivElement }) => JSX.Element

const TextArea: Component = (props) => {
  return (
    <div class={textarea} ref={props.ref}>
      {props.children}
    </div>
  )
}

export { TextArea }
