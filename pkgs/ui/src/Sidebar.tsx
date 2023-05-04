import clsx from 'clsx'
import { Accessor, createEffect, JSX } from 'solid-js'
import { Button } from './Button'
import { Icon } from './Icon'

type propType = JSX.HTMLAttributes<HTMLDivElement> & {
  isSidebarOpen: Accessor<boolean>
  toggleSidebar: () => void
  headings: Accessor<Array<Element> | undefined>
}
type Component = (props: propType & { ref?: HTMLDivElement }) => JSX.Element

const Sidebar: Component = (props) => {
  createEffect(() => {
    if (props.headings() !== undefined) {
      const test = props.headings()
      console.log(test)
    }
  })

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
    </div>
  )
}

export { Sidebar }
