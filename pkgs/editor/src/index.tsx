import './editor.css'
import clsx from 'clsx'
import { Index } from 'flexsearch'
import { createTiptapEditor } from 'solid-tiptap'
import tinykeys from 'tinykeys'
import { BaseLayout, TextArea } from 'ui'
import { Header, Sidebar } from './interface'
import searchIndex from './search'

import {
  Accessor,
  createEffect,
  createSignal,
  For,
  onMount,
  Show,
} from 'solid-js'
import { Features, useUserConfig } from './features'
import { useSidebarState } from './interface/Sidebar'
import extensions from './tiptap_extensions'
import { headingManager } from './utils/utils'

export function Editor() {
  let editorRef: HTMLDivElement

  const [isSearchBoxOpen, setIsSearchBoxOpen] = createSignal(false)

  const sidebar = useSidebarState()
  const { headingStates, getAllHeadings } = headingManager()
  const [docs, setDocs] = createSignal<any[]>([])

  const editorStyle = clsx(
    'prose max-w-none lg:prose-md lg:max-w-4xl leading-relaxed text-gray-700 outline-transparent w-full min-h-full h-fit p-editor prose-p:m-0',
  )

  onMount(() => {
    tinykeys(window, {
      '$mod+k': (e) => {
        e.preventDefault()
        setIsSearchBoxOpen(!isSearchBoxOpen())
      },
      'Escape': () => {
        setIsSearchBoxOpen(false)
      },
    }, { event: 'keydown' })
  })

  const useEditor = createTiptapEditor(() => ({
    element: editorRef,
    extensions: extensions,
    editorProps: {
      attributes: {
        id: 'document',
        class: editorStyle,
      },
    },
    onTransaction({ editor }) {
      const { docs, toggleLastHeadingFocus } = getAllHeadings(
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

  return (
    <BaseLayout isSidebarOpen={sidebar.isSidebarOpen}>
      <Features editor={useEditor()!} config={useUserConfig()} />
      <TextArea ref={editorRef!} />
    </BaseLayout>
  )
}

// <WhichKeyModal />
// <SearchBox
//   isSearchBoxOpen={isSearchBoxOpen}
//   searchIndex={searchIndex}
//   docs={docs()}
// />

// function Column(props: { children: any }) {
//   return (
//     <div class='flex flex-col w-full h-full overflow-hidden'>
//       {props.children}
//     </div>
//   )
// }

export function Search(
  props: {
    isSearchBoxOpen: Accessor<boolean>
    searchIndex: Index<any>
    docs: any
  },
) {
  const [results, setResults] = createSignal<any[]>([])
  const [selectedIndex, setSelectedIndex] = createSignal(0)
  const [docs, setDocs] = createSignal<any[]>([])

  onMount(() => {
    tinykeys(window, {
      'Tab': (e) => {
        e.preventDefault()
        if (selectedIndex() >= docs().length - 1) {
          setSelectedIndex(0)
        } else {
          setSelectedIndex(selectedIndex() + 1)
        }
      },
      'Shift+Tab': (e) => {
        e.preventDefault()
        if (selectedIndex() <= 0) {
          setSelectedIndex(docs().length - 1)
        } else {
          setSelectedIndex(selectedIndex() - 1)
        }
      },
    }, { event: 'keydown' })
  })

  createEffect(() => {
    if (props.isSearchBoxOpen()) {
      document.getElementById('search-box')?.focus()
    } else {
      setDocs([])
    }
  })
  createEffect(() => {
    const matchedDocs = results().flatMap((r) =>
      r.result.map((id: number) => props.docs[id])
    )
    console.log('matched doc: ', matchedDocs)
    setDocs(matchedDocs)
  })

  createEffect(() => {
    const searchResult = document.getElementById(
      `search-result-${selectedIndex()}`,
    )
    searchResult?.scrollIntoView({
      behavior: 'smooth',
    })
  })

  return (
    <Show when={props.isSearchBoxOpen()}>
      <div class='absolute flex items-center justify-start pt-[200px] w-full h-full flex-col bg-white/10 backdrop-blur-sm'>
        <div class='p-4 rounded bg-stone-100 shadow-lg w-1/2 overflow-hidden'>
          <input
            id='search-box'
            type='text'
            onInput={async (e) => {
              const searchResults = await props.searchIndex.search(
                e.currentTarget.value,
              )
              setResults(searchResults)
            }}
            class='w-full h-10 p-2 rounded focus:ring-0 focus:ring-offset-0 focus:outline-none caret-black'
          />

          <div class='mt-4 flex flex-col items-center w-full bg-white max-h-96 overflow-y-auto rounded divide-y'>
            <For each={docs()}>
              {(doc, index) => {
                return (
                  <div
                    id={`search-result-${index()}`}
                    class={clsx('text-sm p-2 w-full', {
                      'bg-neutral-100': selectedIndex() !== index(),
                      'bg-stone-200': selectedIndex() === index(),
                    })}
                  >
                    <div class='font-bold w-full'>
                      {doc.title}
                    </div>
                    <div class='truncate'>
                      {doc.content.join(' ')}
                    </div>
                  </div>
                )
              }}
            </For>
          </div>
        </div>
      </div>
    </Show>
  )
}
