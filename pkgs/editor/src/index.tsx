import './editor.css'
import type { Editor } from '@tiptap/core'
import clsx from 'clsx'
import { createEditor } from 'solid-tiptap'
import { BaseLayout, TextArea } from 'ui'

import {
  createContext,
  createEffect,
  createSignal,
  onMount,
  Show,
  useContext,
} from 'solid-js'
import { DocumentManagerProvider, useDocumentManager } from './documentManager'
import { Features } from './features'
import { useSidebarStore } from './features/sidebar/store'
import extensions from './tiptap_extensions'

const KnotEditorContext = createContext<{
  editor: Editor
}>()

export const useKnotEditor = () => {
  const context = useContext(KnotEditorContext)
  if (!context) {
    console.log('use knot editor context', context)
    throw new Error('useKnotEditor must be used within KnotEditorProvider')
  }
  return context
}

const KnotEditorProvider = (props: { children: any }) => {
  const editorStyle = clsx(
    'prose dark:prose-invert max-w-none lg:prose-md leading-relaxed text-editorFg outline-transparent w-full h-full p-editor prose-p:m-0 focus:outline-none bg-editorBg overflow-y-auto',
  )
  const { getAllHeadings } = useDocumentManager()
  const sidebar = useSidebarStore()

  const editor = createEditor(() => ({
    element: document.querySelector('#text-area')! as HTMLElement,
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
      <Show when={editor()} fallback={<div>loading ...</div>}>
        <KnotEditorContext.Provider
          value={{
            editor: editor()!,
          }}
        >
          {props.children}
        </KnotEditorContext.Provider>
      </Show>
      <TextArea />
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
