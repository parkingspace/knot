import { JSX } from 'solid-js'

type propType = JSX.HTMLAttributes<HTMLDivElement>
type Component = (props: propType & { ref?: HTMLDivElement }) => JSX.Element

const Spacer: Component = (props) => {
  return (
    <div
      onclick={props.onclick}
    >
      {props.children}
    </div>
  )
}

export { Spacer }
