import clsx from 'clsx'
import { Accessor, JSX, Show } from 'solid-js'
import { Button, Icon } from 'ui'

type propType = JSX.HTMLAttributes<HTMLDivElement> & {
  isSidebarOpen: Accessor<boolean>
  toggleSidebar: () => void
}
type Component = (props: propType & { ref?: HTMLDivElement }) => JSX.Element

// TODO: Add breadcrumbs to the nav
const Header: Component = (props) => {
  return (
    <div class='flex p-2 justify-between'>
      <div
        class={clsx('flex flex-row opacity-0 transition-opacity delay-300', {
          'opacity-100': !props.isSidebarOpen(),
        })}
      >
        <Show when={!props.isSidebarOpen()}>
          <Button
            onclick={props.toggleSidebar}
            size={'icon'}
          >
            <Icon name='IconLayoutSidebarLeftExpand' />
          </Button>
        </Show>
      </div>
      <Button
        onclick={() => document.documentElement.classList.toggle('dark')}
        size={'icon'}
      >
        <Icon name='IconSunFilled' />
      </Button>
    </div>
  )
}

export { Header }
