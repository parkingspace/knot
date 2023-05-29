import { children, Component, For, JSXElement, Show } from 'solid-js'
import { useKnotEditor } from '..'
import type {
  FeatureConfig,
  FeatureConfigTypes,
  Features,
} from '../types/configTypes'

import { initCaret } from './caret'
import { initHeader } from './header'
import { initSearch } from './search'
import { initSidebar } from './sidebar'
import { initTypewriter } from './typewriter'
import { initWhichkey } from './whichkey'

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
