import './editor.css'
import { createSignal, onMount } from 'solid-js'
import { createTiptapEditor } from 'solid-tiptap'
import { FlexContainer, TextArea } from 'ui'
import extensions from './extensions'
import redrawKnotCaret from './features/knotCaret'

function Editor() {
  let editorRef!: HTMLDivElement
  let caret: HTMLDivElement
  const [originNode, setOriginNode] = createSignal<HTMLElement | null>(null)

  onMount(() => {
    caret = document.createElement('div')
    editorRef.appendChild(caret).classList.add('knotCaret')
  })

  createTiptapEditor(() => ({
    element: editorRef,
    extensions: extensions,
    content: `<h1>Hi! This is knot</h1>`,
    onCreate({ editor }) {
      editor.view.dom.spellcheck = false
      editor.view.dom.addEventListener(
        'scroll',
        () => redrawKnotCaret(caret, originNode),
      )
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

      const caretPos = redrawKnotCaret(caret, originNode)
      console.log(caretPos)

      if (!caretPos) { return }
      view.dom.scrollBy({
        top: caretPos.top - window.innerHeight / 2,
        left: 0,
        behavior: 'smooth',
      })
    },
  }))

  return (
    <FlexContainer>
      <TextArea ref={editorRef} />
    </FlexContainer>
  )
}

export { Editor }
