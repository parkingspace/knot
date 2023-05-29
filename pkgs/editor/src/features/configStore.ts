import create from 'solid-zustand'
import { persist } from 'zustand/middleware'
import type { FeatureConfig, FeatureName } from '../types/configTypes'

type FeatureState = Pick<FeatureConfig<FeatureName>, 'enabled'>

interface ConfigStore {
  features: Record<FeatureName, FeatureState>
  toggleFeature: (featureName: FeatureName) => void
}

export const useConfigStore = create<ConfigStore>()(
  persist(
    (set, get) => ({
      features: {
        'caret': { enabled: true },
        'whichkey': { enabled: true },
        'typewriter': { enabled: true },
        'sidebar': { enabled: true },
        'search': { enabled: true },
        'header': { enabled: true },
      },
      toggleFeature: (featureName) =>
        set({
          features: {
            ...get().features,
            [featureName]: {
              enabled: !get().features[featureName].enabled,
            },
          },
        }),
    }),
    {
      name: 'config-storage',
    },
  ),
)
