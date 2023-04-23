import './editor.css'
import { createTiptapEditor } from 'solid-tiptap'
import { TextArea } from 'ui'

import { createKnotCaret, KnotCaret } from './features/knotCaret'
import { createTypewriter, Typewriter } from './features/typewriter'
import extensions from './tt_extensions'

function Editor() {
  let editorRef: HTMLDivElement
  let knotCaret: KnotCaret
  let typewriter: Typewriter

  createTiptapEditor(() => ({
    element: editorRef,
    extensions: extensions,
    content: `<h1>Hi! This is knot</h1>`,
    onCreate({ editor }) {
      editor.view.dom.spellcheck = false
      knotCaret = createKnotCaret()
      typewriter = createTypewriter({ dom: editor.view.dom })
      editor.view.dom.addEventListener(
        'scroll',
        () => knotCaret.move({ delay: 0, duration: 0 }),
      )
    },
    onFocus() {
      knotCaret.show()
    },
    onBlur() {
      knotCaret.hide()
    },
    onDestroy() {
      knotCaret.destroy()
    },
    onSelectionUpdate() {
      typewriter.scroll(
        knotCaret
          .move({ delay: 0, duration: 0.2 })
          .y,
      )
    },
    onUpdate() {
      knotCaret
        .move({ delay: 0, duration: 0.2 })
    },
  }))

  return <TextArea ref={editorRef!} />
}

export { Editor }
