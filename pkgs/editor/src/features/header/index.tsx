import clsx from 'clsx'
import { Accessor, Show } from 'solid-js'
import { Button, Icon } from 'ui'
import { useSidebarStore } from '../sidebar/store'
import { ColorSchemeToggleButton } from '../theme/ColorSchemeToggleButton'

// TODO: Add breadcrumbs to the header
export const initHeader = () => {
  // const { isOpen, toggle } = useSidebarStore()
  return (
    <div
      class={clsx('fixed z-50 flex p-2 justify-between right-0', {
        // 'w-full': !isOpen,
      })}
    >
      <div
        class={clsx('flex flex-row opacity-0 transition-opacity delay-300', {
          // 'opacity-100': !isOpen,
        })}
      >
      </div>
      <div class='pr-4'>
        <ColorSchemeToggleButton />
      </div>
    </div>
  )
}
