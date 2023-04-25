import './editor.css'
import { createSignal } from 'solid-js'
import { createTiptapEditor } from 'solid-tiptap'
import { BaseLayout, Sidebar, TextArea } from 'ui'

import {
  KeymapSettingModal,
  setKeymap,
  WhichKeyModal,
} from './features/keybinding'
import { createKnotCaret, KnotCaret } from './features/knotCaret'
import { createTypewriter, Typewriter } from './features/typewriter'
import extensions from './tiptap_extensions'

const [showKeybindingModal, setShowKeybindingModal] = createSignal(false)
const [pressedKey, setPressedKey] = createSignal<string>()

setKeymap({
  setPressedKey,
  toggleKeybindingModal: () => setShowKeybindingModal(!showKeybindingModal()),
})

export function Editor() {
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

  return (
    <BaseLayout>
      <Sidebar />
      <TextArea ref={editorRef!} />
      <KeymapSettingModal
        show={showKeybindingModal()}
        toggle={setShowKeybindingModal}
      />
      <WhichKeyModal pressedKey={pressedKey} />
    </BaseLayout>
  )
}
