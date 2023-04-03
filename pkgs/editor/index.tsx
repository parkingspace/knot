import StarterKit from '@tiptap/starter-kit'
import { Show } from 'solid-js'
import { createTiptapEditor } from 'solid-tiptap'
import { Container, TextArea } from 'ui'

function Editor() {
  let ref!: HTMLDivElement

  const editor = createTiptapEditor(() => ({
    element: ref!,
    extensions: [
      StarterKit,
    ],
    content: `<h1>Hello editor</h1>`,
  }))

  return (
    <Container>
      <Show when={editor}>
        <TextArea ref={ref} />
      </Show>
    </Container>
  )
}

export { Editor }
