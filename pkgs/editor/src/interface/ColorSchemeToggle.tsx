import { createEffect, createSignal, Show } from 'solid-js'
import { Button, Icon } from 'ui'

type theme = 'light' | 'dark'

// TODO: use localstorage to persist the color scheme
export const ColorSchemeToggle = () => {
  const [theme, setTheme] = createSignal<theme>('light')

  createEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme() === 'dark')
  })

  return (
    <Button
      onclick={() =>
        setTheme((theme) => (theme === 'light' ? 'dark' : 'light'))}
      size={'icon'}
    >
      <Show when={theme() === 'dark'} fallback={<Icon name='IconMoonFilled' />}>
        <Icon name='IconSunFilled' />
      </Show>
    </Button>
  )
}
