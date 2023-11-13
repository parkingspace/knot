import type { Editor } from '@tiptap/core'
import clsx from 'clsx'
import { mergeProps } from 'solid-js'
import { createEditor } from 'solid-tiptap'
import tk from 'tinykeys'
import { TextArea } from 'ui'

import {
  createContext,
  createEffect,
  createSignal,
  JSX,
  onMount,
  Show,
  useContext,
} from 'solid-js'
import { File, useCabinetContext } from './Cabinet'
import { Caret } from './features/caret'
import { useDocumentManager } from './global/documentManager'
import extensions from './tiptap_extensions'

const KnotEditorContext = createContext<{
  editor: Editor
}>()

export const useKnotEditor = () => {
  const context = useContext(KnotEditorContext)
  if (!context) {
    console.log('use knot editor context', context)
    throw new Error('useKnotEditor must be used within KnotEditorProvider')
  }
  return context
}

export const KnotEditorProvider = (
  props: {
    id?: number
    lastId?: number
    focusedIndex?: number
    children?: JSX.Element
    content?: string
    editable?: boolean
  },
) => {
  let textAreaRef: HTMLDivElement
  const { getAllHeadings, editors, setEditors } = useDocumentManager()

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
    onTransaction({ editor }) {
      getAllHeadings(editor.state)
        .toggleLastHeadingFocus()
        .setSearchIndex()
    },
  }))

  createEffect(() => {
    const edt = editor()
    if (!edt) {
      return
    }

    edt.setEditable(props.editable === false ? false : true)
  })

  onMount(() => {
    const edt = editor()
    if (!edt) {
      return
    }

    setEditors([...editors, edt])

    edt.chain().focus('end').run()
  })

  return (
    <>
      <Show when={editor()}>
        <KnotEditorContext.Provider
          value={{
            editor: editor()!,
          }}
        >
          {props.children}
        </KnotEditorContext.Provider>
      </Show>
      <EditorArea ref={textAreaRef!} editor={editor()} />
    </>
  )
}

function EditorArea(props: {
  children?: JSX.Element | null
  ref?: HTMLDivElement
  editor: Editor | undefined
}) {
  const [focused, setFocused] = createSignal(false)
  let cardRef: HTMLDivElement

  onMount(() => {
    props.editor?.on('focus', () => {
      setFocused(true)
    })
    props.editor?.on('blur', () => {
      setFocused(false)
    })
  })

  createEffect(() => {
    if (focused()) {
      cardRef.style.transform = 'scale(1.02)'
      setTimeout(() => {
        cardRef.style.transform = 'scale(1)'
      }, 50)
    }
  })

  return (
    <div
      ref={cardRef!}
      class={clsx(
        'border w-full p-2',
        focused() || 'border-transparent',
      )}
    >
      <TextArea
        ref={props.ref!}
      />
    </div>
  )
}
