import './editor.css'
import type { Editor } from '@tiptap/core'
import clsx from 'clsx'
import { createEditor } from 'solid-tiptap'
import { TextArea } from 'ui'

import {
  createContext,
  createEffect,
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
  let textAreaRef: HTMLDivElement
  const editorStyle = clsx(
    'prose dark:prose-invert',
    'lg:prose-md',
    'max-w-none',
    'leading-relaxed',
    'text-editorFg bg-editorBg outline-transparent',
    'w-full h-full',
    'p-editor',
    'prose-p:m-0',
    'focus:outline-none',
    'overflow-y-auto',
  )
  const { getAllHeadings } = useDocumentManager()
  const sidebar = useSidebarStore()

  const editor = createEditor(() => ({
    element: textAreaRef,
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

  let editorDom: HTMLElement

  onMount(() => {
    if (!editor()) {
      return
    }
    editorDom = editor()!.view.dom
  })

  createEffect(() => {
    const isMobile = window.matchMedia('(max-width: 640px)').matches
    console.log('is mobile', isMobile)
    if (isMobile) return
    const sidebarWidth = 280
    const editorDefaultPadding = editorDom.clientWidth / 10

    editorDom.animate({
      paddingLeft: !sidebar.isOpen
        ? [
          `${editorDefaultPadding + sidebarWidth}px`,
          `${editorDefaultPadding}px`,
        ]
        : [
          `${editorDefaultPadding}px`,
          `${editorDefaultPadding + sidebarWidth}px`,
        ],
    }, {
      duration: 150,
      fill: 'forwards',
    })
  })

  return (
    <>
      <Show when={editor()}>
        <KnotEditorContext.Provider
          value={{
            editor: editor()!,
          }}
        >
          {props.children}
        </KnotEditorContext.Provider>
      </Show>
      <TextArea ref={textAreaRef!} />
    </>
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
