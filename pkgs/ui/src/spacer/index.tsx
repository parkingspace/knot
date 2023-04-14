import { JSX } from 'solid-js'
import { spacer } from './.css'

type propType = JSX.HTMLAttributes<HTMLDivElement>
type Component = (props: propType & { ref?: HTMLDivElement }) => JSX.Element

const Spacer: Component = (props) => {
  return (
    <div
      onclick={props.onclick}
      class={spacer}
    >
      {props.children}
    </div>
  )
}

export { Spacer }
