import clsx from 'clsx'
import { Accessor, For, JSX, Match, Show, Switch } from 'solid-js'
import type { HeadingState } from '../../../pkgs/editor/src/headingFocusStore'
import { Button } from './Button'
import { Icon } from './Icon'

type propType = JSX.HTMLAttributes<HTMLDivElement> & {
  isSidebarOpen: Accessor<boolean>
  toggleSidebar: () => void
  headingStates: HeadingState[]
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
      <For each={props.headingStates} fallback={null}>
        {(heading, idx) => {
          const headingClass = clsx(
            'flex gap-x-2 items-center p-2 text-sm transition-colors ease-in-out',
            'hover:bg-neutral-500 hover:text-white',
            {
              'bg-neutral-200 font-semibold': heading.hasFocus,
              'bg-stone-100': !heading.hasFocus,
              'pl-4': heading.node.attrs.level === 1,
              'pl-6': heading.node.attrs.level === 2,
              'pl-8': heading.node.attrs.level === 3,
            },
          )

          return (
            <Show when={heading.node.textContent.length > 0}>
              <div class={headingClass}>
                <Switch>
                  <Match when={heading.node.attrs.level === 1 && idx() === 0}>
                    <Icon name='IconFileText' />
                  </Match>
                  u
                  <Match when={heading.node.attrs.level === 1}>
                    <Icon name='IconH1' />
                  </Match>
                  <Match when={heading.node.attrs.level === 2}>
                    <Icon name='IconH2' />
                  </Match>
                  <Match when={heading.node.attrs.level === 3}>
                    <Icon name='IconH3' />
                  </Match>
                  u
                </Switch>
                {heading.node.textContent}
              </div>
            </Show>
          )
        }}
      </For>
    </div>
  )
}

export { Sidebar }
