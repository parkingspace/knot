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
import { Caret } from './features/caret'
import { useDocumentManager } from './global/documentManager'
import { Note, useNotesContext } from './Note'
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
    note?: Note
    editable?: boolean
  },
) => {
  const merged = mergeProps({ id: 1, lastId: 1 }, props)

  let textAreaRef: HTMLDivElement
  const { getAllHeadings } = useDocumentManager()
  const notes = useNotesContext()

  const [showCaret, setShowCaret] = createSignal(false)

  const editor = createEditor(() => ({
    content: props.note
      ? `<h2>${props.note.title}</h2><p>${props.note.content}</p>`
      : '',
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
            'prose dark:prose-invert': props.note,
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

  let editorDom: HTMLElement

  createEffect(() => {
    const edt = editor()
    if (!edt) {
      return
    }

    edt.setEditable(props.editable === false ? false : true)
  })

  onMount(() => {
    const isMobile = window.matchMedia('(max-width: 640px)').matches
    if (isMobile) {
      console.log('is mobile', isMobile)
    }

    const edt = editor()
    if (!edt) {
      return
    }

    edt.on('focus', () => {
      setShowCaret(true)
    })
    edt.on('blur', () => {
      console.log('blurred')
      setShowCaret(false)
    })
    editorDom = edt.view.dom

    tk(editorDom, {
      'Tab': (e) => {
        e.preventDefault()

        const next = merged.id ? merged.id + 1 : 1
        let nextElement = document.getElementById('editor' + next)

        if (!nextElement) {
          nextElement = document.getElementById('editor' + 1)
        }

        nextElement?.focus()
      },
      'Shift+Tab': (e) => {
        e.preventDefault()

        const prev = merged.id > 1 ? merged.id - 1 : merged.lastId
        let prevElement = document.getElementById('editor' + prev)
        prevElement?.focus()
      },
    })

    if (!props.note) {
      tk(editorDom, {
        'Enter': (e) => {
          e.preventDefault()

          if (!edt.isEmpty) {
            notes.addNote({
              id: Date.now(),
              title: edt.getText(),
              content: edt.getText() ?? '',
            })
            edt.commands.clearContent()
            edt.commands.blur()
          }
        },
      }, { event: 'keydown' })
      tk(window, {
        '$mod+Space': (e) => {
          e.preventDefault()
          edt.commands.focus()
        },
      }, { event: 'keydown' })
    }
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
          <Show when={showCaret()}>
            <Caret editor={editor()!} />
          </Show>
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
