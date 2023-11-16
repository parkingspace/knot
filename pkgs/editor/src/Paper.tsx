import clsx from 'clsx'
import { JSX, Setter, splitProps } from 'solid-js'
import { createEditor } from 'solid-tiptap'
import { TextArea } from 'ui'
import { v4 as uuid } from 'uuid'
import caret from './features/caret/caretState'

import { Component, createContext, onCleanup, onMount } from 'solid-js'
import { useCabinetContext } from './Cabinet'
import { useDocumentManager } from './global/documentManager'
import extensions from './tiptap_extensions'

type PaperProps = {
  children?: JSX.Element
  content?: string
  search?: Setter
} & JSX.HTMLAttributes<HTMLDivElement>

export const Paper: Component<PaperProps> = (
  props,
) => {
  let id = uuid()
  let textAreaRef: HTMLDivElement
  const { addEditor, removeEditor } = useDocumentManager()
  const cabinet = useCabinetContext()
  const [, rest] = splitProps(props, [
    'children',
    'class',
    'onKeyUp',
    'onKeyDown',
    'onBlur',
  ])

  createEditor(() => ({
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
      editor.commands.focus('end')
    },
    onDestroy() {
      caret.hide()
      removeEditor(id)
    },
    onSelectionUpdate() {
      caret.move()
    },
    onFocus() {
      caret.move()
    },
    onBlur() {
      if (props.onBlur) {
        props.onBlur()
      }
      caret.hide()
    },
    onUpdate({ editor }) {
      if (!props.search) {
        return
      }
      const t = editor.getText().trim()
      props.search(cabinet.searchFile(t))
    },
    // onTransaction({ editor }) {
    //   getAllHeadings(editor.state)
    //     .toggleLastHeadingFocus()
    //     .setSearchIndex()
    // },
  }))

  return (
    <TextArea
      ref={textAreaRef!}
      onKeyUp={props.onKeyUp}
      onKeyDown={props.onKeyDown}
      {...rest}
    />
  )
}
