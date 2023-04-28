import { IconLayoutSidebarLeftExpand } from '@tabler/icons-solidjs'
import { Accessor, JSX, Show } from 'solid-js'
import { Button } from './Button'
import { Icon } from './Icon'

type propType = JSX.HTMLAttributes<HTMLDivElement> & {
  isSidebarOpen: Accessor<boolean>
  toggleSidebar: () => void
}
type Component = (props: propType & { ref?: HTMLDivElement }) => JSX.Element

// TODO: Add breadcrumbs to the nav
const Nav: Component = (props) => {
  return (
    <div class='flex p-2 justify-between'>
      <div class='flex flex-row'>
        <Show when={!props.isSidebarOpen()}>
          <Button onclick={props.toggleSidebar} size={'icon'}>
            <Icon name='IconLayoutSidebarLeftExpand' />
          </Button>
        </Show>
      </div>
    </div>
  )
}

export { Nav }
