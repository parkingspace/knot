import './editor.css'
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
import {
  fillEmptyHeading,
  findCurrentLineDomNode,
  findFirstPreviousHeading,
  isHeading,
  isLineAdded,
} from './utils/utils'

export function Editor() {
  let editorRef: HTMLDivElement

  const wk = useWhichkeyState()
  const [userEditorFeatures] = createResource(getUserEditorFeatures)
  const [headings, setHeadings] = createStore<HeadingFocusState[]>([])

  const editorStyle = clsx(
    'prose max-w-none lg:prose-md lg:max-w-4xl leading-relaxed text-gray-700 outline-transparent w-full h-fit p-editor prose-p:m-0',
  )
  function updateDefaultHeadingList(
    dom: HTMLElement,
  ) {
    const headings = [...dom.querySelectorAll('h1, h2, h3')]
      .map((el) => ({
        el,
        hasFocus: false,
      }))
    setHeadings(headings)
  }

  function removeFocusFromHeading(el: Element) {
    setHeadings(
      (heading) => heading.el !== el,
      'hasFocus',
      false,
    )
  }
  function setFocusToHeading(el: Element) {
    setHeadings(
      (heading) => heading.el === el,
      'hasFocus',
      true,
    )
  }

  function toggleHeadingFocus(el: Element) {
    setFocusToHeading(el)
    removeFocusFromHeading(el)
  }

  const toggleEveryHeadingFocusState = (focusedNode: Element) => {
    if (isHeading(focusedNode)) {
      toggleHeadingFocus(focusedNode)
    } else {
      const prevHeading = findFirstPreviousHeading(focusedNode)
      if (prevHeading) {
        toggleHeadingFocus(prevHeading)
      }
    }
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

      onTransaction({ editor, transaction }) {
        const currentLine = findCurrentLineDomNode(editor.view) as Element
        if (transaction.docChanged) {
          // FIX: Find and update headings everytime when doc changed should be optimized
          updateDefaultHeadingList(editor.view.dom)
          const previousLine = currentLine.previousElementSibling
          if (isLineAdded(transaction) && previousLine) {
            fillEmptyHeading(previousLine, 'Untitled')
          }
        }
        toggleEveryHeadingFocusState(currentLine)
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
