import { children, Component, For, JSXElement, Show } from 'solid-js'
import { useKnotEditor } from '..'

import { initCaret } from './caret'
import { initHeader } from './header'
import { initSearch } from './search'
import { initSidebar } from './sidebar'
import { initTypewriter } from './typewriter'
import { initWhichkey } from './whichkey'

interface FeatureConfigTypes {
  'caret': typeof initCaret
  'whichkey': typeof initWhichkey
  'typewriter': typeof initTypewriter
  'sidebar': typeof initSidebar
  'search': typeof initSearch
  'header': typeof initHeader
}

interface FeatureConfig<FeatureName extends keyof FeatureConfigTypes> {
  enabled: boolean
  init: FeatureConfigTypes[FeatureName]
}

const features: {
  [FeatureName in keyof FeatureConfigTypes]: FeatureConfig<FeatureName>
} = {
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

export function fetchUserConfig<FeatureName extends keyof FeatureConfigTypes>(
  featureName: FeatureName,
): FeatureConfig<FeatureName> {
  return features[featureName] as FeatureConfig<FeatureName>
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
  name: keyof FeatureConfigTypes
}

export const Feature: Component<FeatureProps> = (props) => {
  return props as unknown as JSXElement
}
