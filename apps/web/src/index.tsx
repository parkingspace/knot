import { WhichkeyStateProvider } from 'editor/src/features/keymap/whichkeyStore'
import { render } from 'solid-js/web'
import 'ui/style'
import App from './App'

const root = document.getElementById('root') as HTMLElement

render(
  () => (
    <WhichkeyStateProvider>
      <App />
    </WhichkeyStateProvider>
  ),
  root,
)
