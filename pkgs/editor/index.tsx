import './editor.css'
import clsx from 'clsx'
import { createTiptapEditor } from 'solid-tiptap'
import { BaseLayout, Nav, Sidebar, TextArea } from 'ui'

import { createResource, createSignal, onMount } from 'solid-js'
import { useEditorKeymap } from './features/keymap/keymapStore'
import { WhichKeyModal } from './features/keymap/whichkeyModal'
import {
  getUserEditorFeatures,
  initEditorFeatures,
} from './features/toggleFeature'
import extensions from './tiptap_extensions'

export function Editor() {
  let editorRef: HTMLDivElement

  const [userEditorFeatures] = createResource(getUserEditorFeatures)
  const keymap = useEditorKeymap()

  const editorStyle = clsx(
    'prose max-w-none lg:prose-md lg:max-w-4xl leading-relaxed text-gray-700 outline-transparent w-full min-h-screen h-fit p-editor prose-p:m-0',
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
        features && initEditorFeatures(features, editor, keymap)
      },
    }))
  })

  const [isSidebarOpen, setIsSidebarOpen] = createSignal(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen())
  }

  return (
    <>
      <Nav isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <BaseLayout isSidebarOpen={isSidebarOpen}>
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <TextArea ref={editorRef!} />
        <WhichKeyModal />
      </BaseLayout>
    </>
  )
}
