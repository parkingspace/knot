import { onMount } from 'solid-js'
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

export function useFeatureConfig() {
  const localState = localStorage.getItem('features')
  const [featureState, setFeatureState] = createStore<Features>(
    localState ? JSON.parse(localState) : defaultFeatures,
  )

  onMount(() => {
    localStorage.setItem('features', JSON.stringify(featureState))
  })

  const toggleFeature = (feature: FeatureName) => {
    setFeatureState((prev: Features) => ({
      ...prev,
      [feature]: { enabled: !prev[feature].enabled },
    }))
    localStorage.setItem('features', JSON.stringify(featureState))
  }

  return { featureState, toggleFeature }
}
