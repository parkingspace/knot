import './editor.css'
import clsx from 'clsx'
import { createTiptapEditor } from 'solid-tiptap'
import tinykeys from 'tinykeys'
import { BaseLayout, TextArea } from 'ui'
import { Header, Sidebar } from './interface'
import searchIndex from './search'

import { Document, Index } from 'flexsearch'
import {
  Accessor,
  createEffect,
  createResource,
  createSignal,
  For,
  onMount,
  ParentComponent,
  Show,
} from 'solid-js'
import { WhichKeyModal } from './features/keymap/whichkeyModal'
import { useWhichkeyState } from './features/keymap/whichkeyStore'
import {
  getUserEditorFeatures,
  initEditorFeatures,
} from './features/toggleFeature'
import { useSidebarState } from './interface/Sidebar'
import extensions from './tiptap_extensions'
import { headingManager } from './utils/utils'

export function Editor() {
  let editorRef: HTMLDivElement

  const [isSearchBoxOpen, setIsSearchBoxOpen] = createSignal(false)
  const wk = useWhichkeyState()
  const sidebar = useSidebarState()
  const { headingStates, getAllHeadings } = headingManager()
  const [docs, setDocs] = createSignal<any[]>([])
  const [userEditorFeatures] = createResource(getUserEditorFeatures)

  const editorStyle = clsx(
    'prose max-w-none lg:prose-md lg:max-w-4xl leading-relaxed text-gray-700 outline-transparent w-full min-h-full h-fit p-editor prose-p:m-0',
  )

  onMount(() => {
    tinykeys(window, {
      '$mod+k': (e) => {
        console.log('key pressed')
        e.preventDefault()
        setIsSearchBoxOpen(!isSearchBoxOpen())
      },
      'Escape': () => {
        isSearchBoxOpen() && setIsSearchBoxOpen(false)
      },
    }, { event: 'keydown' })

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
        editor.view.dom.spellcheck = false

        const features = userEditorFeatures()
        features && initEditorFeatures(features, editor, wk?.setPressedKey)
      },
      onTransaction({ editor }) {
        const { docs, headings, toggleLastHeadingFocus } = getAllHeadings(
          editor.state,
        )
        setDocs(docs)
        toggleLastHeadingFocus()

        docs.forEach((doc, index) => {
          searchIndex.add(index, {
            title: doc.title,
            content: doc.content.join(' '),
          })
        })
      },
    }))
  })

  return (
    <BaseLayout isSidebarOpen={sidebar.isSidebarOpen}>
      <Sidebar
        headingStates={headingStates}
        isSidebarOpen={sidebar.isSidebarOpen}
        toggleSidebar={sidebar.toggleSidebar}
      />
      <div class='flex flex-col h-full overflow-hidden'>
        <Header
          isSidebarOpen={sidebar.isSidebarOpen}
          toggleSidebar={sidebar.toggleSidebar}
        />
        <TextArea ref={editorRef!} />
      </div>
      <SearchBox
        isSearchBoxOpen={isSearchBoxOpen}
        searchIndex={searchIndex}
        docs={docs()}
      />
      <WhichKeyModal />
    </BaseLayout>
  )
}

function SearchBox(
  props: {
    isSearchBoxOpen: Accessor<boolean>
    searchIndex: Index<any>
    docs: any
  },
) {
  const [results, setResults] = createSignal<any[]>([])
  const [docs, setDocs] = createSignal<any[]>([])

  createEffect(() => {
    props.isSearchBoxOpen()
      && document.getElementById('search-box')?.focus()
  })
  createEffect(() => {
    console.log('results', results())
    if (results().length > 0) {
      const matchedDocs = results().flatMap((result) => {
        console.log('result', result.result)
        return result.result.map((id: number) => {
          return props.docs[id]
        })
      })
      console.log('matched', matchedDocs)
      setDocs(matchedDocs)
    } else {
      setDocs([])
    }
  })
  return (
    <Show when={props.isSearchBoxOpen()}>
      <div class='absolute flex items-center justify-center w-full h-full'>
        <input
          id='search-box'
          type='text'
          onInput={async (e) => {
            const searchResults = await props.searchIndex.search(
              e.currentTarget.value,
            )
            console.log(searchResults)
            setResults(searchResults)
          }}
          class='w-1/2 h-10 p-2 border-2 border-gray-300 rounded-lg'
        />
        <div class='relative flex flex-col items-center justify-center w-64 h-64 bg-white border-2 border-gray-300 rounded-lg'>
          {docs().map((doc) => {
            return (
              <>
                <div class='text-lg font-bold'>{doc.title}</div>
                <div class='text-sm'>{doc.content.join(' ')}</div>
              </>
            )
          })}
        </div>
      </div>
    </Show>
  )
}
