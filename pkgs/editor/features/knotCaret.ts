import type { Accessor } from 'solid-js'

function getCaretGlobalPosition() {
  const r = document.getSelection()?.getRangeAt(0)
  if (!r) { return }
  const node = r.startContainer
  const content = node.textContent
  const offset = r.startOffset
  const pageOffset = { x: window.pageXOffset, y: window.pageYOffset }
  let rect, r2, start, end

  if (offset > 0) {
    start = offset - 1, end = offset
  } else if (content?.length === 0) {
    start = offset, end = offset + 1
  } else {
    start = offset, end = offset
  }

  r2 = document.createRange()
  r2.setStart(node, start)
  r2.setEnd(node, end)
  rect = r2.getBoundingClientRect()
  return { left: rect.right + pageOffset.x, top: rect.top }
}

const redrawKnotCaret = (
  caret: HTMLDivElement,
  originNode: Accessor<HTMLElement | null>,
) => {
  const on = originNode()
  if (!on) { return }
  const style = window.getComputedStyle(on)
  caret.style.height = parseInt(style.fontSize) + 5 + 'px'

  const caretPos = getCaretGlobalPosition()
  if (!caretPos) { return }

  caret.style.top = caretPos.top + 'px'
  caret.style.left = caretPos.left + 'px'

  return caretPos
}

export default redrawKnotCaret
