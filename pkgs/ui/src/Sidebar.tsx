import { JSX } from 'solid-js'

type propType = JSX.HTMLAttributes<HTMLDivElement>
type Component = (props: propType & { ref?: HTMLDivElement }) => JSX.Element

const Sidebar: Component = (props) => {
  return (
    <div class='bg-stone-100 w-72 h-screen'>
      {props.children}
    </div>
  )
}

export { Sidebar }
