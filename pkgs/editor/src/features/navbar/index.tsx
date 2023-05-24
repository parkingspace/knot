import clsx from 'clsx'
import { Accessor, Show } from 'solid-js'
import { Button, Icon } from 'ui'
import { useSidebarState } from '../sidebar'
import { ColorSchemeToggleButton } from '../theme/ColorSchemeToggleButton'

// TODO: Add breadcrumbs to the nav
export const initNavbar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebarState()
  return (
    <div class='fixed flex p-2 justify-between'>
      <div
        class={clsx('flex flex-row opacity-0 transition-opacity delay-300', {
          'opacity-100': !isSidebarOpen(),
        })}
      >
        <Show when={!isSidebarOpen()}>
          <Button
            onclick={toggleSidebar}
            size={'icon'}
          >
            <Icon name='IconLayoutSidebarLeftExpand' />
          </Button>
        </Show>
      </div>
      <ColorSchemeToggleButton />
    </div>
  )
}
