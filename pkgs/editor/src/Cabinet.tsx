import clsx from 'clsx'
import { Component, createSignal, JSX, Show, splitProps } from 'solid-js'
import { createContext, For, useContext } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { Button, Icon } from 'ui'
import { KnotEditor } from '.'
import { KnotEditorProvider } from './Editor'

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

// !TODO
/* onEnter={(e) => {
          e.preventDefault()
          const now = new Date()

          const str = (new Date())
            .toISOString()
            .slice(0, 19)
            .replace(/-/g, '/')
            .replace('T', ' ')

          if (!edt.isEmpty) {
            cabinet.addFile({
              id: Date.now(),
              name: edt.getText(),
              content: edt.getText() ?? '',
              created: str,
              edited: str,
            })
            edt.commands.clearContent()
            edt.commands.blur()
          }
        }} */

const createCabinetContext = () => {
  const key = 'cabinet'
  const localCabinet = localStorage.getItem(key)

  const [cabinet, setCabinet] = createStore({
    files: [] as File[],
    addFile: (file: File) => {
      setCabinet('files', (files) => [...files, file])
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

  return (
    <CabinetContext.Provider value={cabinet}>
      <div class='flex flex-col w-full h-full p-4 gap-4 bg-editorBg relative pb-32'>
        <For each={cabinet.files}>
          {(file) => (
            <FolderCard
              file={file}
            />
          )}
        </For>
        <CreateFolderCard />
      </div>
      {props.children}
    </CabinetContext.Provider>
  )
}

function CreateFolderCard() {
  const cabinet = useCabinetContext()
  const [show, setShow] = createSignal(false)

  return (
    <Card
      onclick={() => {
        setShow(true)
      }}
      class='bg-black/10'
    >
      <Show
        when={show()}
        fallback={
          <Button>
            create
          </Button>
        }
      >
        <KnotEditorProvider
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              console.log('add')
            }
          }}
        />
      </Show>
    </Card>
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
        'border rounded bg-gray-800 text-white p-2 flex flex-col gap-2',
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
          <Icon name='IconFolder' />
          <div
            contenteditable={true}
            class='text-xl font-bold p-1'
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
          <Icon name='IconTrash' />
        </Button>
      </div>
      <div class='flex justify-between'>
        <div class='text-xs text-gray-500'>
          {props.file.id}
        </div>
        <div class='flex flex-col justify-center'>
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
