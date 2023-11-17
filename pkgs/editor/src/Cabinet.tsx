import clsx from 'clsx'
import { Component, JSX, onMount, splitProps } from 'solid-js'
import { createContext, For, useContext } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
// import Sortable from 'sortablejs'
import { Button, Icon } from 'ui'
import searchIndex from './search'

export type File = {
  id: number
  name: string
  created: string
  edited: string
  contents: string
  links: File[]
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
    putFile: (parent: File, child: File) => {
      parent.links.push(child)
    },
    searchFile: (text: string) => {
      if (!text) {
        return []
      }
      const res = searchIndex.search(text) as SearchResult
      const titleIds = res.filter((s) => s.field === 'title')[0]?.result
      if (!titleIds) {
        return []
      }

      const found: File[] = []

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

  // onMount(() => {
  //   const el = document.getElementById('sortable-files')
  //   console.log('on mount')
  //   if (el) {
  //     console.log(el)
  //     Sortable.create(el, {
  //       animation: 150,
  //       ghostClass: 'bg-gray-700',
  //     })
  //   }
  // })

  // TODO: overflow has scroll problem on mobile :
  //  to regenerate problem:
  //  1. add lots of boxes
  //  2. click plus button to open input box
  //  3. scroll to top
  return (
    <CabinetContext.Provider value={cabinet}>
      <ul
        id='sortable-files'
        class='flex flex-col bg-editorBg p-4 gap-2 pb-32 overflow-y-auto'
      >
        <For each={cabinet.files}>
          {(file, i) => (
            <FileCard
              id={i()}
              file={file}
            />
          )}
        </For>
      </ul>
      {props.children}
    </CabinetContext.Provider>
  )
}

type CardProps = {
  children: JSX.Element
} & JSX.HTMLAttributes<HTMLLIElement>

const Card: Component<CardProps> = (props) => {
  const [, rest] = splitProps(props, ['children', 'class'])

  return (
    <li
      class={clsx(
        'hover:border-gray-700',
        'cursor-pointer select-none',
        'border border-gray-400 bg-editorBg text-editorFg',
        'p-2 flex flex-col gap-2',
        props.class,
      )}
      {...rest}
    >
      {props.children}
    </li>
  )
}

function FileCard(
  props: {
    id: number
    file: File
  },
) {
  const cabinet = useCabinetContext()
  let cardRef: HTMLLIElement

  function dragstart_handler(ev: DragEvent) {
    const dt = ev.dataTransfer
    if (!dt) {
      return
    }
    console.log(
      `dragStart: dropEffect = ${ev.dataTransfer.dropEffect} ; effectAllowed = ${ev.dataTransfer.effectAllowed}`,
    )

    // Add this element's id to the drag payload so the drop handler will
    // know which element to add to its tree
    ev.dataTransfer.setData('id', ev.target.id)
    ev.dataTransfer.effectAllowed = 'move'
  }

  function drop_handler(ev: DragEvent) {
    ev.preventDefault()
    ev.stopPropagation()
    const dt = ev.dataTransfer
    if (!dt) {
      return
    }
    console.log(
      `drop: dropEffect = ${ev.dataTransfer.dropEffect} ; effectAllowed = ${ev.dataTransfer.effectAllowed}`,
    )

    // Get the id of the target and add the moved element to the target's DOM
    const id = ev.dataTransfer.getData('id')
    console.log('drop: target', ev)
    console.log('drop: current target', ev.currentTarget)
    ev.currentTarget.appendChild(document.getElementById(id))
    return
  }

  function dragover_handler(ev: DragEvent) {
    const dt = ev.dataTransfer
    if (!dt) {
      return
    }
    console.log(
      `dragOver: dropEffect = ${ev.dataTransfer?.dropEffect} ; effectAllowed = ${ev.dataTransfer.effectAllowed}`,
    )
    ev.preventDefault()
    // Set the dropEffect to move
    //

    if (ev.target.getAttribute('draggable') == 'true') {
      ev.dataTransfer.dropEffect = 'none' // dropping is not allowed
    } else {
      ev.dataTransfer.dropEffect = 'move' // drop it like it's hot
    }
    // ev.dataTransfer.dropEffect = 'move'
  }

  return (
    <Card
      id={'card-' + props.id}
      draggable='true'
      ondrop={drop_handler}
      ondragstart={dragstart_handler}
      ondragover={dragover_handler}
      ref={cardRef!}
    >
      <div class='flex justify-between'>
        <div class='flex items-center justify-center gap-1'>
          <div class='pl-1 text-gray-500'>
            <Icon name='IconFile' />
          </div>
          <div class='text-lg font-bold p-1'>
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
