import { Button, Icon } from 'ui'

// TODO: use localstorage to persist the color scheme
export const ColorSchemeToggle = () => {
  return (
    <Button
      onclick={() => document.documentElement.classList.toggle('dark')}
      size={'icon'}
    >
      <Icon name='IconSunFilled' />
    </Button>
  )
}
