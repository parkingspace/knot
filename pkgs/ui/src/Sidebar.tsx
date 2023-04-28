import { IconLayoutSidebarLeftCollapse } from '@tabler/icons-solidjs'
import { JSX } from 'solid-js'
import { Button } from './Button'

type propType = JSX.HTMLAttributes<HTMLDivElement>
type Component = (props: propType & { ref?: HTMLDivElement }) => JSX.Element

const Sidebar: Component = (props) => {
  return (
    <div class='bg-stone-100 min-w-[280px]'>
      {props.children}
      <Button size={'icon'}>
        <IconLayoutSidebarLeftCollapse stroke={'1.5'} />
      </Button>
    </div>
  )
}

export { Sidebar }
