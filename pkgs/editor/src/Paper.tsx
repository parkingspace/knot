import clsx from 'clsx'
import { Accessor, createEffect, JSX, Setter, splitProps } from 'solid-js'
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
  class?: string
  search?: Setter
  selected?: Accessor
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
    'search',
    'selected',
  ])

  createEffect(() => {
    const selected = props.selected()
    console.log('selected is', selected)
    if (selected) {
      edt()?.chain().setContent(selected.name).focus('end').run()
    }
  })

  const edt = createEditor(() => ({
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
    onTransaction(props) {
      searchOnTransaction(props)

      // getAllHeadings(editor.state)
      //   .toggleLastHeadingFocus()
      //   .setSearchIndex()
    },
  }))

  function searchOnTransaction({ editor, transaction }) {
    // TODO: make it Search function
    if (!props.search) {
      return
    }

    if (
      transaction.docChanged
      && transaction.before.textContent !== transaction.doc.textContent
    ) {
      console.log('doc is changed! let\'s search')
      const t = editor.getText().trim()
      props.search(cabinet.searchFile(t))
    }
    // ------------ Sear
  }

  return (
    <TextArea
      ref={textAreaRef!}
      onKeyUp={props.onKeyUp}
      onKeyDown={props.onKeyDown}
      {...rest}
    />
  )
}
