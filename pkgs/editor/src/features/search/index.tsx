import clsx from 'clsx'
import type { Index } from 'flexsearch'
import type { Accessor } from 'solid-js'
import {
  createContext,
  createEffect,
  createSignal,
  For,
  onMount,
  Show,
} from 'solid-js'
import tinykeys from 'tinykeys'
import { useDocumentManager } from '../../documentManager'
import searchIndex from '../../search'

function createSearchDocState() {
  const [searchResults, setSearchResults] = createSignal<any[]>([])
  const [selectedIndex, setSelectedIndex] = createSignal(0)

  return {
    searchResults,
    setSearchResults,
    selectedIndex,
    setSelectedIndex,
  }
}

type SearchDocState = ReturnType<typeof createSearchDocState>
const SearchDocContext = createContext<SearchDocState>()

const SearchDocProvider = (props: { children: any; when: boolean }) => {
  if (!props.when) {
    return props.children
  }
  const searchDoc = createSearchDocState()
  return (
    <SearchDocContext.Provider value={searchDoc}>
      {props.children}
    </SearchDocContext.Provider>
  )
}

export function initSearch() {
  const [searchResults, setSearchResults] = createSignal<any[]>([])
  const [selectedIndex, setSelectedIndex] = createSignal(0)
  const [matchedDocs, setMatchedDocs] = createSignal<any[]>([])
  const { searchableDocs } = useDocumentManager()

  const [show, setShow] = createSignal(false)

  onMount(() => {
    setShortcuts()
  })

  function setToggleShortcut() {
    tinykeys(window, {
      '$mod+k': (e) => {
        e.preventDefault()
        setShow(!show())
      },
      'Escape': () => {
        setShow(false)
      },
    }, { event: 'keydown' })
  }
  function setSelectShortcut() {
    tinykeys(window, {
      'Tab': (e) => {
        e.preventDefault()
        if (selectedIndex() >= matchedDocs().length - 1) {
          setSelectedIndex(0)
        } else {
          setSelectedIndex(selectedIndex() + 1)
        }
      },
      'Shift+Tab': (e) => {
        e.preventDefault()
        if (selectedIndex() <= 0) {
          setSelectedIndex(matchedDocs().length - 1)
        } else {
          setSelectedIndex(selectedIndex() - 1)
        }
      },
    }, { event: 'keydown' })
  }

  function setShortcuts() {
    setSelectShortcut()
    setToggleShortcut()
  }

  createEffect(() => {
    if (show()) {
      document.getElementById('search-box')?.focus()
    } else {
      setMatchedDocs([])
    }
  })

  createEffect(() => {
    const searchedDocs = setMatchedDocs(
      searchResults().flatMap((r) =>
        r.result.map((id: number) => searchableDocs[id])
      ),
    )
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
    <Show when={show()}>
      <div class='absolute flex items-center justify-start pt-[200px] w-full h-full flex-col bg-white/10 backdrop-blur-sm z-50'>
        <div class='p-4 rounded bg-stone-100 shadow-lg w-1/2 overflow-hidden'>
          <input
            id='search-box'
            type='text'
            onInput={async ({ currentTarget }) => {
              const searchResults = await searchIndex.search(
                currentTarget.value,
              )
              setSearchResults(searchResults)
            }}
            class='w-full h-10 p-2 rounded focus:ring-0 focus:ring-offset-0 focus:outline-none caret-black'
          />

          <div class='mt-4 flex flex-col items-center w-full bg-white max-h-96 overflow-y-auto rounded divide-y'>
            <For each={matchedDocs()}>
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
