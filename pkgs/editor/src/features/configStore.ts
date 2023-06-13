import { createEffect, onMount } from 'solid-js'
import { createStore } from 'solid-js/store'
import type { FeatureName, Features } from '../types/configTypes'

const defaultFeatures: Features = {
  'caret': { enabled: true },
  'whichkey': { enabled: true },
  'typewriter': { enabled: true },
  'sidebar': { enabled: true },
  'search': { enabled: true },
  'header': { enabled: true },
}

const localState = localStorage.getItem('features')
  ? JSON.parse(localStorage.getItem('features') as string) as Features
  : null

const [featureConfig, setFeatureConfig] = createStore({
  features: localState ?? defaultFeatures,
  toggle: (feature: FeatureName) =>
    setFeatureConfig((prev: {
      features: Features
      toggle: (feature: FeatureName) => void
    }) => ({
      features: {
        ...prev.features,
        [feature]: { enabled: !prev.features[feature].enabled },
      },
    })),
})

createEffect(() => {
  console.log('feature state is changed and set localStorage', featureConfig)
  if (!featureConfig.features.caret.enabled) {
    document.getElementById('root')!.style.caretColor = ''
  }
  localStorage.setItem('features', JSON.stringify(featureConfig.features))
})

export function useFeatureConfig() {
  return featureConfig
}
