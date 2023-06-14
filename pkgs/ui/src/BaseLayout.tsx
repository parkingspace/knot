import clsx from 'clsx'
import { Accessor, JSX, onMount } from 'solid-js'

type propType = JSX.HTMLAttributes<HTMLDivElement> & {
  isSidebarOpen: Accessor<boolean>
}
type Component = (props: propType & { ref?: HTMLDivElement }) => JSX.Element

const BaseLayout: Component = (props) => {
  onMount(() => {
    console.log('base layout is mounted')
  })
  return (
    <div
      class={clsx('grid grid-cols-with-sidebar h-full', {
        // 'grid-cols-without-sidebar': !props.isSidebarOpen(),
      })}
    >
      {props.children}
    </div>
  )
}

export { BaseLayout }
