import clsx from 'clsx'
import { Accessor, For, JSX, Show } from 'solid-js'
import type { HeadingFocusState } from '../../../pkgs/editor/headingFocusStore'
import { Button } from './Button'
import { Icon } from './Icon'

type propType = JSX.HTMLAttributes<HTMLDivElement> & {
  isSidebarOpen: Accessor<boolean>
  toggleSidebar: () => void
  headings: HeadingFocusState[]
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
        'dark:bg-stone-800',
        {
          '-translate-x-full opacity-0 invisible cursor-none': !props
            .isSidebarOpen(),
        },
      )}
    >
      {props.children}
      <div class='flex justify-end p-2'>
        <Button onclick={props.toggleSidebar} size={'icon'}>
          <Icon name='IconLayoutSidebarLeftCollapse' />
        </Button>
      </div>
      <For each={props.headings} fallback={null}>
        {(heading) => {
          const headingClass = clsx(
            'p-2 text-sm cursor-pointer transition-colors ease-in-out',
            'hover:bg-neutral-500 hover:text-white',
            {
              'bg-neutral-200 font-semibold': heading.hasFocus,
              'bg-stone-100': !heading.hasFocus,
            },
          )

          return (
              <div class={headingClass}>{heading.node.textContent}</div>
          )
        }}
      </For>
    </div>
  )
}

export { Sidebar }
