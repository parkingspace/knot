import './knotCaret.css'

// TODO: animation could be better if stopped while typing.
const blinkAnimation = {
  opacity: [0, 1],
  offset: [0, 1],
}
const blinkTiming = {
  duration: 1200,
  iterations: Infinity,
}

// TODO: Want this caret to moves like a slime or something
// Should not animated all the time but only when cursor is moved.
// Idea is, the trailing afterimage is proportional to the distance.
// TODO: Make caret listen to focus state of editor
// and only show when editor is focused
export function createKnotCaret() {
  const caret = document.createElement('knot-caret')
  caret.animate(blinkAnimation, blinkTiming)
  const root = document.getElementById('root') ?? document.body
  root.appendChild(caret)
  return caret as KnotCaret
}

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
  move(opts: {
    duration: number
    delay: number
  }) {
    const { duration, delay } = opts
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
    this.style.visibility = 'hidden'
  }
  show() {
    this.style.visibility = 'visible'
  }
  destroy() {
    this.remove()
  }
}
customElements.define('knot-caret', KnotCaret)
