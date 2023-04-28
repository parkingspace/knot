import { IconLayoutSidebarLeftCollapse } from '@tabler/icons-solidjs'
import clsx from 'clsx'
import { Accessor, JSX } from 'solid-js'
import { Button } from './Button'

type propType = JSX.HTMLAttributes<HTMLDivElement> & {
  isSidebarOpen: Accessor<boolean>
  toggleSidebar: () => void
}
type Component = (props: propType & { ref?: HTMLDivElement }) => JSX.Element

const Sidebar: Component = (props) => {
  return (
    <div
      class={clsx(
        'flex',
        'flex-col',
        'bg-stone-100',
        'min-w-[280px]',
        'transition-all',
        'ease-in-out',
        {
          '-translate-x-full opacity-0 invisible cursor-none': !props
            .isSidebarOpen(),
        },
      )}
    >
      {props.children}
      <div class='flex justify-end p-3'>
        <Button onclick={props.toggleSidebar} size={'icon'}>
          <IconLayoutSidebarLeftCollapse stroke={'1.2'} />
        </Button>
      </div>
    </div>
  )
}

export { Sidebar }
