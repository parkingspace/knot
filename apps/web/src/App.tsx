import { emit, listen } from '@tauri-apps/api/event'
import { Editor } from 'editor'
import { onMount } from 'solid-js'

export default function App() {
  onMount(async () => {
    const unlisten = await listen('click', (event) => {
      console.log(event)
    })
  })

  return (
    <>
      <div>
        <button
          onClick={() => emit('click', { theMessage: 'Tauri is awesome!' })}
        >
          hello
        </button>
      </div>
      <Editor />
    </>
  )
}
