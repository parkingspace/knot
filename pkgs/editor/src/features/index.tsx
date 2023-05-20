import type { Editor } from '@tiptap/core'
import { createContext, useContext } from 'solid-js'
import { Search } from '..'
import { Header, Sidebar } from '../interface'
import { initCaret } from './caret'
import { initTypewriter } from './typewriter'
import { initWhichkey } from './whichkey'

type Feature =
  | 'whichkey'
  | 'caret'
  | 'typewriter'
  | 'spellcheck'
  | 'search'
  | 'sidebar'
  | 'navbar'
type UserConfigurations = { [key in Feature]: boolean }

// TODO: store in localStorage and allow user to change
export function fetchUserConfig() {
  return {
    'whichkey': true,
    'caret': true,
    'typewriter': true,
    'spellcheck': true,
    'search': true,
    'sidebar': true,
    'navbar': true,
  }
}

const UserConfigContext = createContext<UserConfigurations>(fetchUserConfig())
const UserConfigProvider = (props: { children: any }) => {
  const config = fetchUserConfig()
  return (
    <UserConfigContext.Provider value={config}>
      {props.children}
    </UserConfigContext.Provider>
  )
}
export const useUserConfig = () => useContext(UserConfigContext)

type InitFeaturesOpts = { config?: UserConfigurations; editor: Editor }
function initFeatures(
  {
    editor,
    config = fetchUserConfig(),
  }: InitFeaturesOpts,
) {
  editor.view.dom.spellcheck = false
  const { whichkey, caret, typewriter } = config

  caret && initCaret({ editor })
  typewriter && initTypewriter({ editor })
  whichkey && initWhichkey()

}

export function Features(
  props: { editor: Editor; config: UserConfigurations },
) {
  const { whichkey, caret, typewriter, sidebar, navbar, search, spellcheck } =
    props.config

   initFeatures({ editor: props.editor, config: props.config })

  return (
    <>
      {whichkey && <Whichkey />}
      {caret && <KnotCaret />}
      {typewriter && <Typewriter />}
      {sidebar && <Sidebar />}
      {navbar && <Header />}
      {search && <Search />}
      {spellcheck && <Spellcheck />}
    </>
  )
}
