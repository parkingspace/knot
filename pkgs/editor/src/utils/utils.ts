import type { Transaction } from '@tiptap/pm/state'
import type { EditorView } from '@tiptap/pm/view'

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
  return transaction.docChanged
      && isLineAdded(transaction)
    || isLineRemoved(transaction)
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
