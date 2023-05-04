import './editor.css'
import clsx from 'clsx'
import { createTiptapEditor } from 'solid-tiptap'
import { BaseLayout, Sidebar, TextArea } from 'ui'
import { Header } from './interface'

import { createEffect, createResource, createSignal, onMount } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { WhichKeyModal } from './features/keymap/whichkeyModal'
import { useWhichkeyState } from './features/keymap/whichkeyStore'
import {
  getUserEditorFeatures,
  initEditorFeatures,
} from './features/toggleFeature'
import extensions from './tiptap_extensions'

type Heading = {
  el: Element
  isFocus: boolean
}

export function Editor() {
  let editorRef: HTMLDivElement

  const wk = useWhichkeyState()
  const [userEditorFeatures] = createResource(getUserEditorFeatures)

  const [headings, setHeadings] = createStore<Array<Heading>>([])

  type DocumentList = {
    [key: string]: { [key: string]: HTMLElement }[]
  }[]

  const [documentList, setDocumentList] = createStore<DocumentList>([])

  const editorStyle = clsx(
    'prose max-w-none lg:prose-md lg:max-w-4xl leading-relaxed text-gray-700 outline-transparent w-full h-fit p-editor prose-p:m-0',
  )
  function findPreviousHeading(node: Element) {
    let previousNode = node.previousElementSibling
    if (!previousNode) {
      return
    }
    let found = false
    while (!found && previousNode) {
      if (previousNode.nodeName.includes('H')) {
        found = true
        return previousNode
      } else {
        previousNode = previousNode.previousElementSibling
      }
    }
  }

  const toggleHeadingFocus = (focusedNode: HTMLElement) => {
    if (focusedNode.nodeName.includes('H')) {
      setHeadings((state) => {
        return state.map((heading) => {
          if (heading.el.className.includes('has-focus')) {
            return {
              ...heading,
              isFocus: true,
            }
          }
          return {
            ...heading,
            isFocus: false,
          }
        })
      })
    } else {
      const previousHeading = findPreviousHeading(focusedNode)
      if (!previousHeading) {
        return
      }
      setHeadings((state) => {
        return state.map((heading) => {
          console.log(heading.el)
          console.log(previousHeading)
          console.log(heading.el === previousHeading)
          if (heading.el === previousHeading) {
            console.log('found')
            console.log(heading.isFocus)
            return {
              ...heading,
              isFocus: true,
            }
          }
          return {
            ...heading,
            isFocus: false,
          }
        })
      })
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
      onTransaction({ editor }) {
        const headingNodes = editor.view.dom.querySelectorAll('h1, h2, h3')
        const headingNodesArray = Array.from(headingNodes)
        setHeadings(
          headingNodesArray.map((el) => {
            return {
              el: el,
              isFocus: false,
            }
          }),
        )

        const view = editor.view
        const currentPos = view.posAtDOM(
          view.domAtPos(view.state.selection.head).node,
          0,
        )
        const currentDom = view.domAtPos(currentPos)
        const node = currentDom.node as HTMLElement
        toggleHeadingFocus(node)
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
