import { onMount } from 'solid-js'
import { Container, TextArea } from 'ui'

import StarterKit from '@tiptap/starter-kit'
import { createTiptapEditor } from 'solid-tiptap'

function Editor() {
  let ref!: HTMLDivElement

  onMount(() => {
    createTiptapEditor(() => ({
      element: ref!,
      extensions: [
        StarterKit,
      ],
      content: `<h1>Hello editor</h1>`,
    }))
  })

  return (
    <Container>
      <TextArea ref={ref} />
    </Container>
  )
}

export { Editor }
