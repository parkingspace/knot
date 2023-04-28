import './editor.css'
import clsx from 'clsx'
import { createTiptapEditor } from 'solid-tiptap'
import { BaseLayout, Nav, Sidebar, TextArea } from 'ui'

import { createSignal, onMount } from 'solid-js'
import {
  setKeyboardEventListeners,
  useEditorKeymap,
} from './features/keymap/keymapStore'
import { WhichKeyModal } from './features/keymap/whichkeyModal'
import { createKnotCaret, KnotCaret } from './features/knotCaret'
import { createTypewriter, Typewriter } from './features/typewriter'
import extensions from './tiptap_extensions'

export function Editor() {
  let editorRef: HTMLDivElement
  let knotCaret: KnotCaret
  let typewriter: Typewriter

  const editorStyle = clsx(
    'prose max-w-none lg:prose-md lg:max-w-4xl leading-relaxed text-gray-700 outline-transparent w-full min-h-screen h-fit p-editor prose-p:m-0',
  )
  const keymap = useEditorKeymap()

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
        if (keymap) {
          setKeyboardEventListeners(editor, keymap)
        }
        knotCaret = createKnotCaret()
        const scrollableDom = editor.view.dom.parentElement
        if (!scrollableDom) { return }
        typewriter = createTypewriter({ dom: scrollableDom })
        scrollableDom.addEventListener(
          'scroll',
          () => knotCaret.move({ delay: 0, duration: 0 }),
        )
        scrollableDom.addEventListener(
          'focus',
          () => knotCaret.move({ delay: 0, duration: 0 }),
        )
        editor.view.dom.spellcheck = false
      },
      onFocus() {
        knotCaret.move({ delay: 0, duration: 0.0 })
        knotCaret.show()
      },
      onBlur() {
        knotCaret.hide()
      },
      onDestroy() {
        knotCaret.destroy()
      },
      onSelectionUpdate({ editor }) {
        typewriter.scroll(
          knotCaret
            .move({ delay: 0, duration: 0.2 })
            .y,
        )

        editor.state.selection.from === editor.state.selection.to
          ? knotCaret.show()
          : knotCaret.hide()
      },
      onUpdate() {
        knotCaret
          .move({ delay: 0, duration: 0.2 })
      },
    }))
  })

  const [isSidebarOpen, setIsSidebarOpen] = createSignal(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen())
  }

  return (
    <>
      <Nav isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <BaseLayout isSidebarOpen={isSidebarOpen}>
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <TextArea ref={editorRef!} />
        <WhichKeyModal />
      </BaseLayout>
    </>
  )
}
