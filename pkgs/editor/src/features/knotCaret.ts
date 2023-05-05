import { Editor } from '@tiptap/core'
import './knotCaret.css'

// TODO: Pause animation when user is typing
const blinkAnimation = [
  {
    opacity: 0,
    easing: 'ease-in',
  },
  {
    opacity: 1,
    easing: 'ease-out',
  },
  {
    opacity: 0,
    easing: 'ease-in',
  },
]

const blinkTiming = {
  duration: 1600,
  iterations: Infinity,
}

// TODO: Want this caret to moves like a slime or something
// Should not animated all the time but only when cursor is moved.
// Idea is, the trailing afterimage is proportional to the distance.
// TODO: Make caret listen to focus state of editor
// and only show when editor is focused
export function createKnotCaret(opts: { editor: Editor }) {
  const { editor } = opts
  const scrollDom = editor.view.dom.parentElement
  if (!scrollDom) {
    throw new Error('Scroll dom not found')
  }
  scrollDom.onscroll = () => caret.move()
  scrollDom.onfocus = () => caret.move()

  const caret = document.createElement('knot-caret') as KnotCaret
  // animation is disabled for now
  // caret.animate(blinkAnimation, blinkTiming)
  const root = document.getElementById('root') ?? document.body
  root.appendChild(caret)

  editor.on('focus', () => {
    caret.show()
    caret.move()
  })
  editor.on('blur', () => {
    caret.hide()
  })
  editor.on('selectionUpdate', () => {
    caret.move({ duration: 0.2, delay: 0 })
    editor.state.selection.from === editor.state.selection.to
      ? caret.show()
      : caret.hide()
  })
  editor.on('update', () => {
    caret.move({ duration: 0.2, delay: 0 })
  })
  editor.on('destroy', () => {
    caret.destroy()
  })

  return caret
}

// FIX: caret is not positioned correctly when the editor is scrolled
/**
 * KnotCaret is a custom element that is used to customize the caret of the editor.
 * @class knotCaret
 * @extends {HTMLElement}
 * @example
 * const caret = document.createElement('knot-caret')
 * document.body.appendChild(caret)
 * caret.move({ duration: 0.5, delay: 0 })
 */
export class KnotCaret extends HTMLElement {
  x: number = 0
  y: number = 0

  connectedCallback() {
    this.className = 'knotCaret'
    this.move()
  }

  /**
   * Move the knot caret to the current original caret position
   *
   * @param opts
   * @param opts.duration - duration of the animation in seconds
   * @param opts.delay - delay of the animation in seconds
   * @returns this
   * @memberof knotCaret
   * @example
   * const caret = document.createElement('knot-caret')
   * document.body.appendChild(caret)
   * caret.move({ duration: 0.5, delay: 0 })
   */
  move(opts?: {
    duration: number
    delay: number
  }) {
    const { duration, delay } = opts || { duration: 0.0, delay: 0.0 }
    const { x, y, height } = this.#getDefaultCaretRect()
      || { x: 0, y: 0, height: 0 }
    this.style.height = height + 'px'
    this.style.transition =
      `transform ${duration}s cubic-bezier(0.22, 0.68, 0, 1.21) ${delay}s`
    this.style.transform = `translate(${x}px, ${y}px)`

    this.x = x
    this.y = y
    return this
  }

  /**
   * Get the global position of the default caret and return it as an object.
   * private method
   *
   * @returns the global position of the default caret or undefined
   * @memberof knotCaret
   */
  #getDefaultCaretRect(): { x: number; y: number; height: number } | undefined {
    let r

    if (document.activeElement && document.activeElement.id === 'document') {
      r = document.getSelection()?.getRangeAt(0)
    }

    if (!r) {
      return
    }

    const node = r.startContainer
    const content = node.textContent
    const offset = r.startOffset
    const pageOffset = { x: window.pageXOffset, y: window.pageYOffset }
    let rect, r2, start, end
    if (offset > 0) {
      start = offset - 1, end = offset
    } else if (content?.length === 0) {
      start = offset, end = offset + 1
    } else {
      start = offset, end = offset
    }
    r2 = document.createRange()
    r2.setStart(node, start)
    r2.setEnd(node, end)
    rect = r2.getBoundingClientRect()
    return { x: rect.right + pageOffset.x, y: rect.top, height: rect.height }
  }

  hide() {
    this.style.display = 'none'
  }

  show() {
    this.style.display = 'block'
  }

  destroy() {
    this.remove()
  }
}

customElements.define('knot-caret', KnotCaret)
