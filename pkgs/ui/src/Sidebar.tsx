import clsx from 'clsx'
import { Accessor, For, JSX } from 'solid-js'
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
      {props.headings.map((heading) => {
        const headingClass = clsx(
          'p-2',
          'text-sm',
          'cursor-pointer',
          'hover:bg-neutral-600',
          'hover:text-white',
          {
            'bg-neutral-200': heading.hasFocus,
            'font-semibold': heading.hasFocus,
            'bg-stone-100': !heading.hasFocus,
            'pl-4': heading.el.tagName === 'H1',
            'pl-6': heading.el.tagName === 'H2',
            'pl-8': heading.el.tagName === 'H3',
          },
        )

        return <div class={headingClass}>{heading.el.textContent}</div>
      })}
    </div>
  )
}

export { Sidebar }
