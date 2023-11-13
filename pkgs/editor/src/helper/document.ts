import { Transaction } from '@tiptap/pm/state'
import { EditorView } from '@tiptap/pm/view'

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
  return (
    (transaction.docChanged && isLineAdded(transaction))
    || isLineRemoved(transaction)
  )
}

function findCurrentLineDomNode(view: EditorView) {
  const currentPos = view.posAtDOM(
    view.domAtPos(view.state.selection.head).node,
    0,
  )
  return view.domAtPos(currentPos).node
}

function fillEmptyHeading(dom: Element, content: string) {
  if (isEmptyHeading(dom)) {
    dom.textContent = content
  }
}

export {
  fillEmptyHeading,
  findCurrentLineDomNode,
  isEmptyHeading,
  isHeading,
  isLineAdded,
  isLineChanged,
  isLineRemoved,
}
