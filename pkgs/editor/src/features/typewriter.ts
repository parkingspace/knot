import { Editor } from '@tiptap/core'
import { KnotCaret } from './knotCaret'
import './typewriter.css'

export function createTypewriter({
  editor,
  caret,
}: {
  editor: Editor
  caret: KnotCaret
}) {
  const scrollDom = editor.view.dom.parentElement
  if (!scrollDom) {
    throw new Error('Scroll dom not found')
  }
  const tw = new Typewriter(scrollDom)
  editor.on('selectionUpdate', () => {
    tw.scroll(caret.y)
  })
  return tw
}

export class Typewriter {
  scrollDom: HTMLElement
  scroll: (y: number) => void
  constructor(scrollDom: HTMLElement) {
    this.scrollDom = scrollDom
    // TODO: Maybe use smooth scroll library?
    // https://idiotwu.github.io/smooth-scrollbar/
    this.scroll = (y) => {
      const amount = y - window.innerHeight / 2
      this.scrollDom.scrollBy({
        top: amount,
        behavior: 'smooth',
      })
    }
  }
}
