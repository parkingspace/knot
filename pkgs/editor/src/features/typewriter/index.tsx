import { useKnotEditor } from '../../Editor'
import { getDefaultCaretRect } from '../caret'

export function initTypewriter() {
  const scrollDom = document.getElementById('root')
  if (!scrollDom) {
    throw new Error('Scroll dom not found on initTypewriter')
  }
  const tw = new Typewriter(scrollDom)

  let prevY = 0
  document.onselectionchange = () => {
    const y = getDefaultCaretRect()?.y || 0
    if (y !== prevY) {
      tw.scroll(y)
      prevY = y
    }
  }

  return <></>
}

export class Typewriter {
  scrollDom: HTMLElement
  scroll: (y: number) => void
  constructor(scrollDom: HTMLElement) {
    this.scrollDom = scrollDom
    this.scroll = (y) => {
      const amount = y - window.innerHeight / 2
      console.log('###scroll amount', amount)
      this.scrollDom.scrollBy({
        top: amount,
        behavior: 'smooth',
      })
    }
  }
}
