import { children, Component, For, JSXElement, Show } from 'solid-js'
import { useKnotEditor } from '..'
import type { FeatureName, Features, FeatureTypes } from '../types/configTypes'
import { useFeatureConfig } from './configStore'

import { initCaret } from './caret'
import { initHeader } from './header'
import { initSearch } from './search'
import { initSidebar } from './sidebar'
import { initTypewriter } from './typewriter'
import { initWhichkey } from './whichkey'

interface FeaturesProps {
  children: JSXElement
}

function getFeatureComponent<FeatureName extends keyof FeatureTypes>(
  name: FeatureName,
): FeatureTypes[FeatureName] {
  const components = {
    caret: initCaret,
    header: initHeader,
    search: initSearch,
    sidebar: initSidebar,
    typewriter: initTypewriter,
    whichkey: initWhichkey,
  }

  return components[name]
}

export function Features(props: FeaturesProps) {
  const { featureState, toggleFeature } = useFeatureConfig()
  const features = children(() => props.children)
  const featuresArray = features.toArray() as unknown as FeatureProps[]

  const { editor } = useKnotEditor()
  editor.view.dom.spellcheck = false

  return (
    <>
      <For each={featuresArray}>
        {(feature) => {
          return (
            <>
              <Show when={featureState[feature.name].enabled}>
                {getFeatureComponent(feature.name)()}
              </Show>
            </>
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
