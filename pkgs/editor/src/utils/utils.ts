import { Node } from '@tiptap/pm/model'
import type { EditorState, Transaction } from '@tiptap/pm/state'
import type { EditorView } from '@tiptap/pm/view'
import { createRoot } from 'solid-js'
import { createStore } from 'solid-js/store'
import type { HeadingState } from '../headingFocusStore'

export function isHeading(node: Element) {
  return node.nodeName.includes('H')
}

export function isEmptyHeading(node: Element) {
  return isHeading(node) && node.textContent === ''
}

export function isLineAdded(transaction: Transaction) {
  return transaction.doc.childCount > transaction.before.childCount
}

export function isLineRemoved(transaction: Transaction) {
  return transaction.doc.childCount < transaction.before.childCount
}

export function isLineChanged(transaction: Transaction) {
  return (
    (transaction.docChanged && isLineAdded(transaction))
    || isLineRemoved(transaction)
  )
}

export function findCurrentLineDomNode(view: EditorView) {
  const currentPos = view.posAtDOM(
    view.domAtPos(view.state.selection.head).node,
    0,
  )
  return view.domAtPos(currentPos).node
}

export function fillEmptyHeading(dom: Element, content: string) {
  if (isEmptyHeading(dom)) {
    dom.textContent = content
  }
}

const docIs = {
  1: { title: 'foo', content: ['foo', 'bar'] },
  2: { title: 'bar', content: ['foo', 'bar'] },
}

function headingFocusStore() {
  const [headingStates, setHeadingStates] = createStore<HeadingState[]>([])

  function getAllHeadings(editorState: EditorState) {
    let lastHeading: Node | undefined
    let headingNodes: Array<Node> = []
    let contents: Array<string> = []
    let docs: { 'title': string; 'content': string[] }[] = []

    let currentHeading: Node | undefined
    let headingIndex = -1
    editorState.doc.nodesBetween(
      0,
      editorState.doc.content.size,
      (node, pos) => {
        if (node.type.name === 'heading') {
          headingNodes.push(node)
          currentHeading = node
          headingIndex += 1
          docs[headingIndex] = {
            title: headingNodes[headingIndex].textContent,
            content: [],
          }
          if (pos > editorState.selection.from) {
            return false
          }
          lastHeading = node
        }
        if (node.type.name === 'paragraph') {
          contents.push(node.textContent)
          docs[headingIndex].content = [
            ...docs[headingIndex].content,
            node.textContent,
          ]
        }
      },
    )

    setHeadingStates(
      headingNodes.map((node) => {
        return {
          node: node,
          hasFocus: false,
        }
      }),
    )

    return {
      toggleLastHeadingFocus: () => toggleHeadingFocus(lastHeading),
      headings: headingNodes,
      docs: docs,
    }
  }

  function toggleHeadingFocus(targetHeading: Node | undefined) {
    if (!targetHeading) {
      return
    }
    setHeadingStates((headings) =>
      headings.map((heading) => {
        if (heading.node === targetHeading) {
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
    )
  }
  return {
    headingStates,
    getAllHeadings,
  }
}

export const headingManager = () => createRoot(headingFocusStore)
