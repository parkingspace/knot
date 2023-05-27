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

interface FeaturesProps {
  children: JSXElement
}

export function Features(props: FeaturesProps) {
  const features = children(() => props.children)
  const evaluatedFeatures = features.toArray() as unknown as FeatureProps[]

  const { editor } = useKnotEditor()
  editor.view.dom.spellcheck = false

  return (
    <>
      <For each={evaluatedFeatures}>
        {(feature) => {
          return (
            <Show when={fetchUserConfig(feature.name).enabled}>
              {fetchUserConfig(feature.name).init()}
            </Show>
          )
        }}
      </For>
    </>
  )
}

interface FeatureProps {
  name: FeatureName
}

export const Feature: Component<FeatureProps> = (props) => {
  return props as unknown as JSXElement
}
