import clsx from 'clsx'
import { JSX, splitProps } from 'solid-js'
import { createEditor } from 'solid-tiptap'
import { TextArea } from 'ui'
import { v4 as uuid } from 'uuid'
import caret from './features/caret/caretState'

import { Component, createContext, onCleanup, onMount } from 'solid-js'
import { useDocumentManager } from './global/documentManager'
import extensions from './tiptap_extensions'

type PaperProps = {
  children?: JSX.Element
  content?: string
} & JSX.HTMLAttributes<HTMLDivElement>

export const Paper: Component<PaperProps> = (
  props,
) => {
  let textAreaRef: HTMLDivElement
  let id = uuid()
  const { addEditor, removeEditor } = useDocumentManager()
  const [, rest] = splitProps(props, ['children', 'class', 'onKeyDown'])

  const editor = createEditor(() => ({
    content: props.content ?? '',
    element: textAreaRef,
    extensions: extensions,
    editorProps: {
      handleDOMEvents: {
        keydown: (_, e) => {
          if (props.onKeyDown) {
            if (e.key === 'Enter') {
              return true
            }
          }
        },
      },
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
    onCreate({ editor }) {
      addEditor({ id: id, handler: editor })
    },
    onDestroy() {
      removeEditor(id)
    },
    onSelectionUpdate() {
      caret.move()
    },
    onFocus() {
      caret.move()
    },
    onBlur() {
      caret.hide()
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
    console.log('++++++ Mount editor : ', id)
    edt.chain().focus('end').run()
  })

  return (
    <TextArea
      ref={textAreaRef!}
      onkeydown={props.onKeyDown}
      {...rest}
    />
  )
}
