import 'ui/style.css'
import { onMount } from 'solid-js'
import { Container, TextArea } from 'ui'

import { createTiptapEditor } from 'solid-tiptap'
import Extension from './extension'

function Editor() {
  let ref!: HTMLDivElement

  onMount(() => {
    createTiptapEditor(() => ({
      element: ref,
      extensions: [Extension],
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
