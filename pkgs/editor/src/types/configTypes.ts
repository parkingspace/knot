import { initCaret } from '../features/caret'
import { initHeader } from '../features/header'
import { initSearch } from '../features/search'
import { initSidebar } from '../features/sidebar'
import { initTypewriter } from '../features/typewriter'
import { initWhichkey } from '../features/whichkey'

export interface FeatureConfigTypes {
  'caret': typeof initCaret
  'whichkey': typeof initWhichkey
  'typewriter': typeof initTypewriter
  'sidebar': typeof initSidebar
  'search': typeof initSearch
  'header': typeof initHeader
}

export type FeatureName = keyof FeatureConfigTypes

export interface FeatureConfig<FeatureName extends keyof FeatureConfigTypes> {
  enabled: boolean
  init: FeatureConfigTypes[FeatureName]
}

export type Features = {
  [FeatureName in keyof FeatureConfigTypes]: FeatureConfig<FeatureName>
}
