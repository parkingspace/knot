import { JSX } from 'solid-js'

type propType = JSX.HTMLAttributes<HTMLDivElement>
type Component = (props: propType & { ref?: HTMLDivElement }) => JSX.Element

const Sidebar: Component = (props) => {
  return (
    <div class='bg-stone-100 min-w-[280px]'>
      {props.children}
    </div>
  )
}

export { Sidebar }
