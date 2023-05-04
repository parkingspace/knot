import './editor.css'
import clsx from 'clsx'
import { createTiptapEditor } from 'solid-tiptap'
import { BaseLayout, Sidebar, TextArea } from 'ui'
import { Header } from './interface'

import { Node } from '@tiptap/pm/model'
import { Transaction } from '@tiptap/pm/state'
import { EditorView } from '@tiptap/pm/view'
import {
  createEffect,
  createMemo,
  createResource,
  createSignal,
  onMount,
  Setter,
} from 'solid-js'
import { createStore, produce, SetStoreFunction } from 'solid-js/store'
import { WhichKeyModal } from './features/keymap/whichkeyModal'
import { useWhichkeyState } from './features/keymap/whichkeyStore'
import {
  getUserEditorFeatures,
  initEditorFeatures,
} from './features/toggleFeature'
import extensions from './tiptap_extensions'

function findFirstPreviousHeading(node: Element) {
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
function isHeading(node: Element) {
  return node.nodeName.includes('H')
}

function isEmptyHeading(node: Element) {
  return isHeading(node) && node.textContent === ''
}

function isLineAdded(transaction: Transaction) {
  return transaction.doc.childCount > transaction.before.childCount
}
function isLineRemoved(transaction: Transaction) {
  return transaction.doc.childCount < transaction.before.childCount
}
function isLineChanged(transaction: Transaction) {
  return transaction.docChanged
      && isLineAdded(transaction)
    || isLineRemoved(transaction)
}

function findCurrentLineDomNode(view: EditorView) {
  const currentPos = view.posAtDOM(
    view.domAtPos(view.state.selection.head).node,
    0,
  )
  return view.domAtPos(currentPos).node
}

type Heading = {
  el: Element
  hasFocus: boolean
}

function fillEmptyHeading(dom: Element, content: string) {
  if (isEmptyHeading(dom)) {
    dom.textContent = content
  }
}

export function Editor() {
  let editorRef: HTMLDivElement

  const wk = useWhichkeyState()
  const [userEditorFeatures] = createResource(getUserEditorFeatures)
  const [headings, setHeadings] = createStore<Array<Heading>>([])
  const [currentLineDomNode, setCurrentLineDomNode] = createSignal<Element>()

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
