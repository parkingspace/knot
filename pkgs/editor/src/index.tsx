import './editor.css'
import { Node } from '@tiptap/pm/model'
import clsx from 'clsx'
import { createTiptapEditor } from 'solid-tiptap'
import { BaseLayout, Sidebar, TextArea } from 'ui'
import type { HeadingFocusState } from './headingFocusStore'
import { Header } from './interface'

import { createResource, createSignal, onMount } from 'solid-js'
import { createStore } from 'solid-js/store'
import { WhichKeyModal } from './features/keymap/whichkeyModal'
import { useWhichkeyState } from './features/keymap/whichkeyStore'
import {
  getUserEditorFeatures,
  initEditorFeatures,
} from './features/toggleFeature'
import extensions from './tiptap_extensions'
import { getAllHeadings } from './utils/utils'

export function Editor() {
  let editorRef: HTMLDivElement

  const wk = useWhichkeyState()
  const [userEditorFeatures] = createResource(getUserEditorFeatures)
  const [headings, setHeadings] = createStore<HeadingFocusState[]>([])

  const editorStyle = clsx(
    'prose max-w-none lg:prose-md lg:max-w-4xl leading-relaxed text-gray-700 outline-transparent w-full min-h-full h-fit p-editor prose-p:m-0',
  )

  const toggleHeadingFocus = (node: Node) => {
    setHeadings((state) => {
      return state.map((heading) => {
        if (heading.node === node) {
          return {
            ...heading,
            hasFocus: true,
          }
        }
        return {
          ...heading,
          hasFocus: false,
        }
      })
    })
  }

  onMount(() => {
    createTiptapEditor(() => ({
      element: editorRef,
      extensions: extensions,
      editorProps: {
        attributes: {
          id: 'document',
          class: editorStyle,
        },
      },
      onCreate({ editor }) {
        editor.view.dom.spellcheck = false

        const features = userEditorFeatures()
        features && initEditorFeatures(features, editor, wk?.setPressedKey)
      },
      onTransaction({ editor }) {
        getAllHeadings(editor.state)
      },
    }))
  })

  const [isSidebarOpen, setIsSidebarOpen] = createSignal(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen())
  }

  return (
    <BaseLayout isSidebarOpen={isSidebarOpen}>
      <Sidebar
        headings={headings}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div class='flex flex-col h-full overflow-hidden'>
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <TextArea ref={editorRef!} />
      </div>
      <WhichKeyModal />
    </BaseLayout>
  )
}
