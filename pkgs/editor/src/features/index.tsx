import {
  children,
  Component,
  createContext,
  For,
  JSXElement,
  Show,
  useContext,
} from 'solid-js'
import { useKnotEditor } from '..'

import { initCaret } from './caret'
import { initHeader } from './header'
import { initSearch } from './search'
import { initSidebar } from './sidebar'
import { initTypewriter } from './typewriter'
import { initWhichkey } from './whichkey'

type FeatureName =
  | 'caret'
  | 'whichkey'
  | 'typewriter'
  | 'sidebar'
  | 'search'
  | 'header'
type UserConfigurations = ReturnType<typeof fetchUserConfig>

// TODO: store it into localStorage and allow user to change
export function fetchUserConfig(featureName: FeatureName) {
  const features = {
    caret: {
      enabled: true,
      init: initCaret,
    },
    whichkey: {
      enabled: true,
      init: initWhichkey,
    },
    typewriter: {
      enabled: true,
      init: initTypewriter,
    },
    sidebar: {
      enabled: true,
      init: initSidebar,
    },
    search: {
      enabled: true,
      init: initSearch,
    },
    header: {
      enabled: true,
      init: initHeader,
    },
  }

  return features[featureName]
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

interface FeaturesProps {
  children: JSXElement
}

export function Features(props: FeaturesProps) {
  const features = children(() => props.children)
  const evaluatedFeatures = features.toArray() as unknown as FeatureProps[]
  return (
    <>
      <For each={evaluatedFeatures}>
        {(feature) => {
          return (fetchUserConfig(feature.name).init())
        }}
      </For>
    </>
  )
  //   props: {
  //     features: UserConfigurations
  //   },
  // ) {
  //   const { features } = props
  //   const { editor } = useKnotEditor()
  //   editor.view.dom.spellcheck = false
  //
  //   console.log(features)
  //
  //   return (
  //     <For each={features}>
  //       {(feature) => feature.init()}
  //     </For>
  //   )
}

interface FeatureProps {
  name: FeatureName
}

export const Feature: Component<FeatureProps> = (props) => {
  return props as unknown as JSXElement
}
