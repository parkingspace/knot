import clsx from 'clsx'
import {
  Accessor,
  createContext,
  createSignal,
  For,
  JSX,
  Match,
  Show,
  Switch,
  useContext,
} from 'solid-js'
import { BaseLayout, Button, Icon } from 'ui'
import { useDocumentManager } from '../../documentManager'
import type { HeadingFocusState } from '../../types/headingStates'
import { useSidebarStore } from './store'

type SidebarState = ReturnType<typeof useSidebarStore>

const SidebarContext = createContext<SidebarState>()

export const useSidebarState = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebarState must be used within SidebarProvider')
  }
  return context
}

export function createSidebarState() {
  const [isSidebarOpen, setIsSidebarOpen] = createSignal(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen())
  }

  return { isSidebarOpen, setIsSidebarOpen, toggleSidebar }
}

export function SidebarProvider(props: { children: any; when: boolean }) {
  const sidebar = useSidebarStore()
  if (!props.when) {
    return props.children
  }
  return (
    <SidebarContext.Provider value={sidebar}>
      <BaseLayout isSidebarOpen={() => sidebar.isOpen}>
        {props.children}
      </BaseLayout>
    </SidebarContext.Provider>
  )
}

type SidebarProps = JSX.HTMLAttributes<HTMLDivElement> & {
  isSidebarOpen: Accessor<boolean>
  toggleSidebar: () => void
  headingStates: HeadingFocusState[]
}
export function initSidebar() {
  const { headingStates } = useDocumentManager()
  const { isOpen, toggle } = useSidebarStore()

  return (
    <div
      class={clsx('flex', 'flex-col', 'bg-sidebarBg', 'min-w-sidebar')}
    >
      <div
        class={clsx('flex justify-end p-2', {
          'fixed z-50': !isOpen,
        })}
      >
        <Button onclick={toggle} size={'icon'}>
          <Icon
            name={isOpen
              ? 'IconLayoutSidebarLeftCollapse'
              : 'IconLayoutSidebarLeftExpand'}
          />
        </Button>
      </div>
      <For each={headingStates} fallback={null}>
        {(heading, idx) => {
          const headingClass = clsx(
            'flex gap-x-2 items-center p-2 text-sm transition-colors ease-in-out',
            'hover:bg-gray-500 hover:text-white',
            {
              'bg-gray-200 font-semibold': heading.hasFocus,
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
