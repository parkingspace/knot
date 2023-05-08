import './editor.css'
import clsx from 'clsx'
import { createTiptapEditor } from 'solid-tiptap'
import { BaseLayout, TextArea } from 'ui'
import { Header, Sidebar } from './interface'

import {
  createContext,
  createResource,
  createSignal,
  onMount,
  useContext,
} from 'solid-js'
import { createStore } from 'solid-js/store'
import { WhichKeyModal } from './features/keymap/whichkeyModal'
import { useWhichkeyState } from './features/keymap/whichkeyStore'
import {
  getUserEditorFeatures,
  initEditorFeatures,
} from './features/toggleFeature'
import extensions from './tiptap_extensions'
import { headingManager } from './utils/utils'

type SidebarState = ReturnType<typeof createSidebarState>

const SidebarContext = createContext<SidebarState>()

export const useSidebarState = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebarState must be used within SidebarProvider')
  }
  return context
}

export function createSidebarState() {
  const [isSidebarOpen, setIsSidebarOpen] = createSignal(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen())
  }

  return { isSidebarOpen, setIsSidebarOpen, toggleSidebar }
}

export function SidebarProvider(props: { children: any }) {
  const sidebarState = createSidebarState()
  return (
    <SidebarContext.Provider value={sidebarState}>
      {props.children}
    </SidebarContext.Provider>
  )
}

export function Editor() {
  let editorRef: HTMLDivElement

  const wk = useWhichkeyState()
  const sidebar = useSidebarState()
  const { headingStates, getAllHeadings } = headingManager()
  const [userEditorFeatures] = createResource(getUserEditorFeatures)

  const editorStyle = clsx(
    'prose max-w-none lg:prose-md lg:max-w-4xl leading-relaxed text-gray-700 outline-transparent w-full min-h-full h-fit p-editor prose-p:m-0',
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
      <div class='flex flex-col h-full overflow-hidden'>
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
