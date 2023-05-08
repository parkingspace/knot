import { WhichkeyStateProvider } from 'editor/src/features/keymap/whichkeyStore'
import { SidebarProvider } from 'editor/src/interface/Sidebar'
import { render } from 'solid-js/web'
import 'ui/style'
import App from './App'

const root = document.getElementById('root') as HTMLElement

render(
  () => (
    <WhichkeyStateProvider>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </WhichkeyStateProvider>
  ),
  root,
)
