import { children, Component, For, JSXElement, Show } from 'solid-js'
import { useKnotEditor } from '..'
import type {
  FeatureConfig,
  FeatureConfigTypes,
  Features,
} from '../types/configTypes'
import { useConfigStore } from './configStore'

import { initCaret } from './caret'
import { initHeader } from './header'
import { initSearch } from './search'
import { initSidebar } from './sidebar'
import { initTypewriter } from './typewriter'
import { initWhichkey } from './whichkey'

export function fetchUserConfig<FeatureName extends keyof FeatureConfigTypes>(
  featureName: FeatureName,
): FeatureConfig<FeatureName> {
  const userConfig = useConfigStore()

  const features: Features = {
    caret: {
      enabled: userConfig.features.caret.enabled,
      init: initCaret,
    },
    whichkey: {
      enabled: userConfig.features.whichkey.enabled,
      init: initWhichkey,
    },
    typewriter: {
      enabled: userConfig.features.typewriter.enabled,
      init: initTypewriter,
    },
    sidebar: {
      enabled: userConfig.features.sidebar.enabled,
      init: initSidebar,
    },
    search: {
      enabled: userConfig.features.search.enabled,
      init: initSearch,
    },
    header: {
      enabled: userConfig.features.header.enabled,
      init: initHeader,
    },
  }

  return features[featureName] as FeatureConfig<FeatureName>
}

interface FeaturesProps {
  children: JSXElement
}

export function Features(props: FeaturesProps) {
  const userConfig = useConfigStore()
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
              <button onClick={() => userConfig.toggleFeature(feature.name)}>
                toggle {feature.name}
              </button>
            </Show>
          )
        }}
      </For>
    </>
  )
}

interface FeatureProps {
  name: keyof FeatureConfigTypes
}

export const Feature: Component<FeatureProps> = (props) => {
  return props as unknown as JSXElement
}
