import { Editor } from '@tiptap/core'
import clsx from 'clsx'
import { Component, createSignal, JSX, Show, splitProps } from 'solid-js'
import { createContext, For, useContext } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { Button, Icon } from 'ui'
import { Paper } from './Paper'
import searchIndex from './search'

export type File = {
  id: number
  name: string
  created: string
  edited: string
  contents: string
}

export type Folder = {
  id: number
  name: string
  created: string
  edited: string
  files: File[] | null
}

type SearchResult = {
  field: string
  result: number[]
}[]

const createCabinetContext = () => {
  const key = 'cabinet'
  const localCabinet = localStorage.getItem(key)

  const [cabinet, setCabinet] = createStore({
    files: [] as File[],
    searchFile: (text: string) => {
      if (!text) {
        return []
      }
      const res = searchIndex.search(text) as SearchResult
      const titleIds = res.filter((s) => s.field === 'title')[0]?.result
      if (!titleIds) {
        return []
      }

      const found = []

      titleIds.forEach((id) => {
        const file = cabinet.files.find((f) => f.id === id)
        if (file) {
          found.push(file)
        }
      })

      if (found.length > 0) {
        return found.reverse()
      }
      return []
    },
    addFile: (file: File) => {
      setCabinet('files', (files) => [...files, {
        ...file,
      }])
      searchIndex.add(file.id, {
        title: file.name,
        content: file.contents,
      })
      localStorage.setItem(key, JSON.stringify(cabinet.files))
    },
    editFile: (id: number, change: string) => {
      setCabinet(
        'files',
        (file) => file.id === id,
        produce((f) => {
          f.name = change
          f.edited = (new Date())
            .toISOString()
            .slice(0, 19)
            .replace(/-/g, '/')
            .replace('T', ' ')
          console.log(f)
        }),
      )
      localStorage.setItem(key, JSON.stringify(cabinet.files))
    },
    removeFile: (id: number) => {
      setCabinet('files', (files) => files.filter((f) => f.id !== id))
      localStorage.setItem(key, JSON.stringify(cabinet.files))
    },
  })

  if (localCabinet) {
    setCabinet('files', JSON.parse(localCabinet))
    cabinet.files.forEach((f) => {
      searchIndex.add(f.id, {
        title: f.name,
        content: f.contents,
      })
    })
  }

  return cabinet
}

const CabinetContext = createContext<ReturnType<typeof createCabinetContext>>()

export const useCabinetContext = () => {
  const context = useContext(CabinetContext)
  if (!context) {
    throw new Error('useCabinetContext must be used within CabinetProvider')
  }
  return context
}

export const CabinetProvider = (props: { children: any }) => {
  const cabinet = createCabinetContext()

  // TODO: overflow has scroll problem on mobile :
  //  to regenerate problem:
  //  1. add lots of boxes
  //  2. click plus button to open input box
  //  3. scroll to top
  return (
    <CabinetContext.Provider value={cabinet}>
      <div class='flex flex-col w-full h-full bg-editorBg p-4 gap-2 pb-32 overflow-y-auto'>
        <For each={cabinet.files}>
          {(file) => (
            <FolderCard
              file={file}
            />
          )}
        </For>
      </div>
      {props.children}
    </CabinetContext.Provider>
  )
}

type CardProps = {
  children: JSX.Element
} & JSX.HTMLAttributes<HTMLDivElement>

const Card: Component<CardProps> = (props) => {
  const [, rest] = splitProps(props, ['children', 'class'])

  return (
    <div
      class={clsx(
        'border border-gray-400 bg-editorBg text-editorFg p-2 flex flex-col gap-2',
        props.class,
      )}
      {...rest}
    >
      {props.children}
    </div>
  )
}

function FolderCard(
  props: {
    file: File
  },
) {
  const cabinet = useCabinetContext()

  return (
    <Card>
      <div class='flex justify-between'>
        <div class='flex items-center justify-center gap-1'>
          <div class='pl-1 text-gray-500'>
            <Icon name='IconFolder' />
          </div>
          <div
            contenteditable={true}
            class='text-lg font-bold p-1'
            onkeydown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                console.log(e.target.textContent)
                cabinet.editFile(
                  props
                    .file
                    .id,
                  e.target.textContent || props.file.name,
                )
              }
            }}
          >
            {props.file.name}
          </div>
        </div>
        <Button
          onclick={() => {
            cabinet.removeFile(props.file.id)
          }}
        >
          <div class='text-gray-500'>
            <Icon name='IconTrash' />
          </div>
        </Button>
      </div>
      <div class='flex justify-between'>
        <div class='p-2 text-xs text-gray-500'>
          {props.file.id}
        </div>
        <div class='flex flex-col justify-center text-gray-400'>
          <div class='text-xs flex justify-between gap-1'>
            <span>
              created:
            </span>
            {props.file.created}
          </div>
          <div class='text-xs flex justify-between gap-1'>
            <span>
              edited:
            </span>
            {props.file.edited}
          </div>
        </div>
      </div>
    </Card>
  )
}
