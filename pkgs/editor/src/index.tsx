import { ConfigurationManagerProvider } from './global/configurationManager'
import { DocumentManagerProvider } from './global/documentManager'
import { NotesProvider } from './Note'

export function KnotEditor() {
  return (
    <DocumentManagerProvider>
      <ConfigurationManagerProvider>
        <NotesProvider />
      </ConfigurationManagerProvider>
    </DocumentManagerProvider>
  )
}
