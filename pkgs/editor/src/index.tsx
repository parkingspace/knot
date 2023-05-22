import './editor.css'
import clsx from 'clsx'
import { createTiptapEditor } from 'solid-tiptap'
import { BaseLayout, TextArea } from 'ui'
import { Header, Sidebar } from './interface'

import { createResource, onMount } from 'solid-js'
import { WhichKeyModal } from './features/keymap/whichkeyModal'
import { useWhichkeyState } from './features/keymap/whichkeyStore'
import {
  getUserEditorFeatures,
  initEditorFeatures,
} from './features/toggleFeature'
import { useSidebarState } from './interface/Sidebar'
import extensions from './tiptap_extensions'
import { headingManager } from './utils/utils'

export function Editor() {
  let editorRef: HTMLDivElement

  const wk = useWhichkeyState()
  const sidebar = useSidebarState()
  const { headingStates, getAllHeadings } = headingManager()
  const [userEditorFeatures] = createResource(getUserEditorFeatures)

  const editorStyle = clsx(
    'prose dark:prose-invert max-w-none lg:prose-md md:max-w-4xl leading-relaxed text-editorFg outline-transparent w-full min-h-full h-fit p-editor prose-p:m-0 focus:outline-none',
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
      onTransaction({ editor }) {
        getAllHeadings(editor.state).toggleLastHeadingFocus()
      },
    }))
  })

  return (
    <BaseLayout isSidebarOpen={sidebar.isSidebarOpen}>
      <Sidebar
        headingStates={headingStates}
        isSidebarOpen={sidebar.isSidebarOpen}
        toggleSidebar={sidebar.toggleSidebar}
      />
      <div class='flex flex-col h-full overflow-hidden bg-editorBg'>
        <Header
          isSidebarOpen={sidebar.isSidebarOpen}
          toggleSidebar={sidebar.toggleSidebar}
        />
        <TextArea ref={editorRef!} />
      </div>
      <WhichKeyModal />
    </BaseLayout>
  )
}
