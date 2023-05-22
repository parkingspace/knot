import { createEffect, createSignal, Show } from 'solid-js'
import { Button, Icon } from 'ui'

type Theme = 'light' | 'dark'

function getTheme(): Theme {
  if (typeof localStorage === 'undefined' || !localStorage.getItem('theme')) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  const theme = localStorage.getItem('theme') as Theme
  return theme
}

export const ColorSchemeToggle = () => {
  const [theme, setTheme] = createSignal<Theme>(getTheme())

  createEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme() === 'dark')
    root.dataset.theme = theme()
    if (theme() === 'light') {
      localStorage.setItem('theme', 'light')
    } else {
      localStorage.setItem('theme', 'dark')
    }
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
