import clsx from 'clsx'
import {
  Accessor,
  createContext,
  createEffect,
  createSignal,
  For,
  JSX,
  Match,
  onCleanup,
  onMount,
  Show,
  Switch,
  useContext,
} from 'solid-js'
import { Portal } from 'solid-js/web'
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
  let sidebarRef: HTMLDivElement
  let toggleButtonRef: HTMLDivElement
  let foldSidebarAnimation: Animation
  let moveButtonAnimation: Animation
  let flipButtonAnimation: Animation

  const { headingStates } = useDocumentManager()
  const { isOpen, toggle } = useSidebarStore()

  const foldSidebarTiming = {
    duration: 150,
    fill: 'forwards',
  } as KeyframeEffectOptions

  const moveButtonTiming = {
    duration: 150,
    fill: 'backwards',
  } as KeyframeEffectOptions

  const flipButtonTiming = {
    duration: 150,
    fill: 'forwards',
  } as KeyframeEffectOptions

  onMount(() => {
    const foldSidebarKeyframe = new KeyframeEffect(
      sidebarRef,
      [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-100%)' },
      ],
      foldSidebarTiming,
    )
    const moveButtonX = sidebarRef.clientWidth - toggleButtonRef.clientWidth
    const moveButtonKeyframe = new KeyframeEffect(
      toggleButtonRef,
      [
        { transform: `translateX(${moveButtonX}px)` },
        { transform: 'translateX(0px)' },
      ],
      moveButtonTiming,
    )

    const flipButtonKeyframe = new KeyframeEffect(
      toggleButtonRef,
      [
        { transform: 'rotateY(0deg)' },
        { transform: 'rotateY(180deg)' },
      ],
      flipButtonTiming,
    )

    foldSidebarAnimation = new Animation(foldSidebarKeyframe)
    flipButtonAnimation = new Animation(flipButtonKeyframe)
    moveButtonAnimation = new Animation(moveButtonKeyframe)

    foldSidebarAnimation.onfinish = () => {
      flipButtonAnimation.play()
    }
  })

  createEffect(() => {
    if (!isOpen) {
      foldSidebarAnimation.play()
      moveButtonAnimation.play()
    } else {
      foldSidebarAnimation.reverse()
      moveButtonAnimation.reverse()
    }
  })

  return (
    <>
      <div
        ref={toggleButtonRef!}
        class={clsx('p-2 fixed z-20')}
      >
        <Button onclick={() => toggle()} size={'icon'}>
          <Icon name='IconLayoutSidebarLeftCollapse' />
        </Button>
      </div>
      <div
        ref={sidebarRef!}
        id='sidebar'
        class={clsx(
          'flex',
          'flex-col',
          'bg-sidebarBg',
          'h-full',
          'overflow-y-auto',
          'z-10',
          'fixed',
          'pt-14',
          'w-sidebar',
        )}
      >
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
    </>
  )
}
