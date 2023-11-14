import type { Editor } from '@tiptap/core'
import clsx from 'clsx'
import { createEditor } from 'solid-tiptap'
import { TextArea } from 'ui'

import {
  createContext,
  createEffect,
  createSignal,
  JSX,
  onCleanup,
  onMount,
  Show,
  useContext,
} from 'solid-js'
import { useDocumentManager } from './global/documentManager'
import extensions from './tiptap_extensions'

const KnotEditorContext = createContext<{
  editor: Editor
}>()

export const useKnotEditor = () => {
  const context = useContext(KnotEditorContext)
  if (!context) {
    throw new Error('useKnotEditor must be used within KnotEditorProvider')
  }
  return context
}

export const KnotEditorProvider = (
  props: {
    // id?: number
    // lastId?: number
    // focusedIndex?: number
    // children?: JSX.Element
    // content?: string
    // editable?: boolean
  },
) => {
  let textAreaRef: HTMLDivElement
  let id: number = 0
  const { addEditor, removeEditor } = useDocumentManager()

  const editor = createEditor(() => ({
    content: props.content ?? '',
    element: textAreaRef,
    extensions: extensions,
    editorProps: {
      attributes: {
        id: 'editor' + (props.id ? props.id : 0),
        class: clsx(
          'lg:prose-md',
          'prose-p:m-0',
          'text-editorFg bg-editorBg outline-transparent leading-relaxed',
          'w-full h-full p-4',
          'focus:outline-none',
          'overflow-y-auto',
          {
            'prose dark:prose-invert': props.content,
          },
        ),
      },
    },
    // onTransaction({ editor }) {
    //   getAllHeadings(editor.state)
    //     .toggleLastHeadingFocus()
    //     .setSearchIndex()
    // },
  }))

  onMount(() => {
    const edt = editor()
    if (!edt) {
      return
    }
    console.log('Mount editor')

    addEditor({ id: ++id, handler: edt })

    edt.chain().focus('end').run()
  })

  onCleanup(() => {
    const edt = editor()
    if (!edt) {
      return
    }
    edt.destroy()
    removeEditor(id)

    console.log('Cleanup editor')
  })

  return (
    <TextArea
      ref={textAreaRef}
    />
  )
}
