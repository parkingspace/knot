import { CabinetProvider } from './Cabinet'
import { Caret } from './features/caret'
import {
  ConfigurationManagerProvider,
  ToolBelt,
} from './global/configurationManager'
import { DocumentManagerProvider } from './global/documentManager'

export function KnotEditor() {
  return (
    <DocumentManagerProvider>
      <ConfigurationManagerProvider>
        <CabinetProvider>
          <ToolBelt />
          <Caret />
        </CabinetProvider>
      </ConfigurationManagerProvider>
    </DocumentManagerProvider>
  )
}
