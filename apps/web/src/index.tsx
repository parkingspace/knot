import { Editor } from 'editor'
import { render } from 'solid-js/web'

const root = document.getElementById('root') as HTMLElement

render(
  () => <Editor />,
  root,
)
