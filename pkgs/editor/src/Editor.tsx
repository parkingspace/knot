import type { Editor } from '@tiptap/core'
import { JSX, splitProps } from 'solid-js'
import clsx from 'clsx'
import { createEditor } from 'solid-tiptap'
import { TextArea } from 'ui'

import {
    Component,
  createContext,
  onCleanup,
  onMount,
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

type PaperProps = {
  children?: JSX.Element
  content?: string
} & JSX.HTMLAttributes<HTMLDivElement>


export const KnotEditorProvider: Component<PaperProps> = (
  props
) => {
  let id: number = 0
  let textAreaRef: HTMLDivElement
  const { addEditor, removeEditor } = useDocumentManager()
  const [, rest] = splitProps(props, ['children', 'class'])

  const editor = createEditor(() => ({
    content: props.content ?? '',
    element: textAreaRef,
    extensions: extensions,
    editorProps: {
      attributes: {
        // id: 'editor' + (props.id ? props.id : 0),
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
      ref={textAreaRef!}
      {...rest}
    />
  )
}
