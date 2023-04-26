import { KeymapProvider } from 'editor/features/keybinding/keymapStore'
import { render } from 'solid-js/web'
import 'ui/style'
import App from './App'

const root = document.getElementById('root') as HTMLElement

render(
  () => (
    <KeymapProvider>
      <App />
    </KeymapProvider>
  ),
  root,
)
