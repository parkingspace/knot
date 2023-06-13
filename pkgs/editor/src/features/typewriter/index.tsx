import { useKnotEditor } from '../..'
import { getDefaultCaretRect } from '../caret'

export function initTypewriter() {
  const { editor } = useKnotEditor()
  const scrollDom = editor.view.dom
  if (!scrollDom) {
    throw new Error('Scroll dom not found on initTypewriter')
  }
  const tw = new Typewriter(scrollDom)
  editor.on('selectionUpdate', () => tw.scroll(getDefaultCaretRect()?.y || 0))

  return <></>
}

export class Typewriter {
  scrollDom: HTMLElement
  scroll: (y: number) => void
  constructor(scrollDom: HTMLElement) {
    this.scrollDom = scrollDom
    this.scroll = (y) => {
      const amount = y - window.innerHeight / 2
      this.scrollDom.scrollBy({
        top: amount,
        behavior: 'smooth',
      })
    }
  }
}
