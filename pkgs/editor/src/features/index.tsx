import { createContext, For, useContext } from 'solid-js'
import { useKnotEditor } from '..'

import { initCaret } from './caret'
import { initNavbar } from './navbar'
import { initSearch } from './search'
import { initSidebar } from './sidebar'
import { initTypewriter } from './typewriter'
import { initWhichkey } from './whichkey'

type UserConfigurations = ReturnType<typeof fetchUserConfig>

// TODO: store it into localStorage and allow user to change
export function fetchUserConfig() {
  return [
    {
      name: 'caret',
      enabled: true,
      init: initCaret,
    },
    {
      name: 'whichkey',
      enabled: true,
      init: initWhichkey,
    },
    {
      name: 'typewriter',
      enabled: true,
      init: initTypewriter,
    },
    {
      name: 'sidebar',
      enabled: true,
      init: initSidebar,
    },
    {
      name: 'search',
      enabled: true,
      init: initSearch,
    },
    {
      name: 'navbar',
      enabled: true,
      init: initNavbar,
    },
  ]
}

const UserConfigContext = createContext<UserConfigurations>(fetchUserConfig())
export const UserConfigProvider = (props: { children: any }) => {
  const config = fetchUserConfig()
  return (
    <UserConfigContext.Provider value={config}>
      {props.children}
    </UserConfigContext.Provider>
  )
}
export const useUserConfig = () => useContext(UserConfigContext)

export function Features(
  props: {
    features: UserConfigurations
  },
) {
  const { features } = props
  const { editor } = useKnotEditor()
  editor.view.dom.spellcheck = false

  return (
    <For each={features}>
      {(feature) => feature.init()}
    </For>
  )
}
