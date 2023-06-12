import './editor.css'
import type { Editor } from '@tiptap/core'
import clsx from 'clsx'
import { createEditor } from 'solid-tiptap'
import { BaseLayout, TextArea } from 'ui'
import { SidebarProvider } from './features/sidebar'

import { createContext, Show, useContext } from 'solid-js'
import { DocumentManagerProvider, useDocumentManager } from './documentManager'
import { Feature, Features } from './features'
import { useFeatureConfig } from './features/configStore'
import { useSidebarStore } from './features/sidebar/store'
import extensions from './tiptap_extensions'

const KnotEditorContext = createContext<{
  editor: Editor
  editorRef: HTMLDivElement
}>()

export const useKnotEditor = () => {
  const context = useContext(KnotEditorContext)
  if (!context) {
    throw new Error('useKnotEditor must be used within KnotEditorProvider')
  }
  return context
}

const KnotEditorProvider = (props: { children: any }) => {
  let editorRef: HTMLDivElement
  const editorStyle = clsx(
    'prose dark:prose-invert max-w-none lg:prose-md leading-relaxed text-editorFg outline-transparent w-full min-h-full h-fit p-editor prose-p:m-0 focus:outline-none bg-editorBg',
  )
  const { getAllHeadings } = useDocumentManager()
  const sidebar = useSidebarStore()

  const editor = createEditor(() => ({
    element: editorRef,
    extensions: extensions,
    editorProps: {
      attributes: {
        id: 'document',
        class: editorStyle,
      },
    },
    onTransaction({ editor }) {
      getAllHeadings(editor.state)
        .toggleLastHeadingFocus()
        .setSearchIndex()
    },
  }))

  return (
    <BaseLayout isSidebarOpen={() => sidebar.isOpen}>
      <Show when={editor()}>
        <KnotEditorContext.Provider
          value={{
            editor: editor()!,
            editorRef: editorRef!,
          }}
        >
          {props.children}
        </KnotEditorContext.Provider>
      </Show>
      <TextArea ref={editorRef!} />
    </BaseLayout>
  )
}

export function KnotEditor() {
  return (
    <DocumentManagerProvider>
      <KnotEditorProvider>
        <Features />
      </KnotEditorProvider>
    </DocumentManagerProvider>
  )
}
