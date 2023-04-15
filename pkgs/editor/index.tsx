import 'ui/style.css'
import './editor.css'
import { createSignal, onMount } from 'solid-js'
import { createTiptapEditor } from 'solid-tiptap'
import { FlexContainer, TextArea } from 'ui'
import Extension from './extension'

function createElement(
  type: string,
  parent: HTMLElement,
  className?: string | undefined,
) {
  const el = document.createElement(type)
  parent.appendChild(el)
  if (className) { el.className = className }
  return el
}

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

function Editor() {
  let ref!: HTMLDivElement
  let knotCaret: HTMLDivElement

  const [originNode, setOriginNode] = createSignal<HTMLElement | null>(null)

  const redrawKnotCaret = () => {
    const on = originNode()
    if (!on) { return }
    const style = window.getComputedStyle(on)
    knotCaret.style.height = parseInt(style.fontSize) + 5 + 'px'

    const caretPos = getCaretGlobalPosition()
    if (!caretPos) { return }

    knotCaret.style.top = caretPos.top + 'px'
    knotCaret.style.left = caretPos.left + 'px'

    return caretPos
  }

  createTiptapEditor(() => ({
    element: ref,
    extensions: [Extension],
    content: `<h1>Hi! This is knot 🧶</h1>`,
    onCreate({ editor }) {
      editor.view.dom.spellcheck = false
      editor.view.dom.addEventListener('scroll', () => redrawKnotCaret())
    },
    onSelectionUpdate({ editor }) {
      const view = editor.view
      const currentPos = view.posAtDOM(
        view
          .domAtPos(view.state.selection.head)
          .node,
        0,
      )
      const currentDom = view.domAtPos(currentPos).node as HTMLElement
      setOriginNode(currentDom)

      const caretPos = redrawKnotCaret()
      if (!caretPos) { return }
      view.dom.scrollBy({
        top: caretPos.top - window.innerHeight / 2,
        left: 0,
        behavior: 'smooth',
      })
    },
  }))

  onMount(() => {
    knotCaret = createElement('div', ref, 'knotCaret') as HTMLDivElement
  })

  return (
    <FlexContainer>
      <TextArea ref={ref} />
    </FlexContainer>
  )
}

export { Editor }
