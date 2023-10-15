import {
  createContext,
  createEffect,
  createSignal,
  For,
  useContext,
} from 'solid-js'
import { createStore } from 'solid-js/store'
import { KnotEditorProvider } from './Editor'
import { ToolBelt } from './global/configurationManager'

export type Note = {
  id: number
  title: string
  content: string
}

const createNotesStore = () => {
  const [notes, setNotes] = createStore({
    notes: [] as Note[],
    addNote: (note: Note) => {
      setNotes('notes', (notes) => [...notes, note])
      localStorage.setItem(notesStorageKey, JSON.stringify(notes))
    },
    removeNote: (note: Note) => {
      setNotes('notes', (notes) => notes.filter((n) => n.id !== note.id))
      localStorage.setItem(notesStorageKey, JSON.stringify(notes))
    },
  })

  const notesStorageKey = 'knot-notes'
  const notesStorage = localStorage.getItem(notesStorageKey)
  if (notesStorage) {
    setNotes(JSON.parse(notesStorage))
  }
  return notes
}

const NotesContext = createContext<ReturnType<typeof createNotesStore>>()

export const useNotesContext = () => {
  const context = useContext(NotesContext)
  if (!context) {
    throw new Error('useNotesContext must be used within NotesProvider')
  }
  return context
}

export function NotesProvider() {
  const notes = createNotesStore()

  return (
    <NotesContext.Provider value={notes}>
      <div class='flex flex-col w-full p-4 gap-4 bg-editorBg relative pb-32'>
        <For each={notes.notes}>
          {(note, i) => (
            <KnotEditorProvider
              note={note}
              id={i() + 1}
              lastId={notes.notes.length}
            />
          )}
        </For>
      </div>
      <ToolBelt />
    </NotesContext.Provider>
  )
}
