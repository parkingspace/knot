import './editor.css'
import clsx from 'clsx'
import { createTiptapEditor } from 'solid-tiptap'
import { BaseLayout, Sidebar, TextArea } from 'ui'

import { onMount } from 'solid-js'
import { WhichKeyModal } from './features/keybinding'
import {
  createEditorKeymap,
  useEditorKeymap,
} from './features/keybinding/keymapStore'
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
          class: editorStyle,
        },
      },
      onCreate({ editor }) {
        if (keymap) {
          createEditorKeymap(editor, keymap)
        }
        knotCaret = createKnotCaret()
        typewriter = createTypewriter({ dom: editor.view.dom })
        editor.view.dom.addEventListener(
          'scroll',
          () => knotCaret.move({ delay: 0, duration: 0 }),
        )
        editor.view.dom.spellcheck = false
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
  })

  return (
    <BaseLayout>
      <Sidebar />
      <TextArea ref={editorRef!} />
      <WhichKeyModal />
    </BaseLayout>
  )
}
