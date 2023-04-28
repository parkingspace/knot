import { IconLayoutSidebarLeftExpand } from '@tabler/icons-solidjs'
import clsx from 'clsx'
import { Accessor, JSX, Show } from 'solid-js'
import { Button } from './Button'

type propType = JSX.HTMLAttributes<HTMLDivElement> & {
  isSidebarOpen: Accessor<boolean>
  toggleSidebar: () => void
}
type Component = (props: propType & { ref?: HTMLDivElement }) => JSX.Element

const Nav: Component = (props) => {
  return (
    <div class=''>
      <Show when={!props.isSidebarOpen()}>
        <Button onclick={props.toggleSidebar} size={'icon'}>
          <IconLayoutSidebarLeftExpand stroke={'1.2'} />
        </Button>
      </Show>
    </div>
  )
}

export { Nav }
