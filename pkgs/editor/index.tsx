import './editor.css'
import clsx from 'clsx'
import { createTiptapEditor } from 'solid-tiptap'
import { BaseLayout, Sidebar, TextArea } from 'ui'
import { Header } from './interface'

import { createEffect, createResource, createSignal, onMount } from 'solid-js'
import { WhichKeyModal } from './features/keymap/whichkeyModal'
import { useWhichkeyState } from './features/keymap/whichkeyStore'
import {
  getUserEditorFeatures,
  initEditorFeatures,
} from './features/toggleFeature'
import extensions from './tiptap_extensions'

export function Editor() {
  let editorRef: HTMLDivElement

  const wk = useWhichkeyState()
  const [userEditorFeatures] = createResource(getUserEditorFeatures)

  const [headings, setHeadings] = createSignal<Array<Element>>()

  const editorStyle = clsx(
    'prose max-w-none lg:prose-md lg:max-w-4xl leading-relaxed text-gray-700 outline-transparent w-full h-fit p-editor prose-p:m-0',
  )

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
      onUpdate({ editor }) {
        const headingNodes = editor.view.dom.querySelectorAll('h1, h2, h3')
        const headingNodesArray = Array.from(headingNodes)
        setHeadings(headingNodesArray)
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
