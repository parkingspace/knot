import clsx from 'clsx'
import { createEffect, createSignal, onMount } from 'solid-js'
import { useKnotEditor } from '../..'

/**
 * Get the global position of the default caret and return it as an object.
 *
 * @returns the global position of the default caret or undefined
 */
export function getDefaultCaretRect() {
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

// TODO: Pause animation when user is typing
const blink = {
  opacity: [0, 1],
  offset: [0.2, 0.9],
  easing: ['ease-out', 'ease-out'],
}

const timing = {
  duration: 900,
  iterations: Infinity,
}

export function initCaret() {
  let caretRef: HTMLSpanElement
  let caretBlinkAnimation: Animation

  const { editor } = useKnotEditor()
  if (!editor) {
    throw new Error('Editor not found \n:) inside initCaret function')
  }

  const [show, setShow] = createSignal(false)
  const [caretStyle, setCaretStyle] = createSignal('')

  createEffect(() => {
    const s = clsx(
      'absolute w-1 bg-stone-900 rounded-sm pointer-events-none block',
      {
        'visible': show(),
        'invisible': !show(),
      },
    )
    setCaretStyle(s)
  })

  onMount(() => {
    addScrollListener(editor.view.dom.parentElement)
    removeDefaultCaret()
    initBlinkAnimation()
  })

  function initBlinkAnimation() {
    caretBlinkAnimation = caretRef.animate(blink, timing)
  }

  function removeDefaultCaret() {
    document.getElementById('root')!.style.caretColor = 'transparent'
  }

  function addScrollListener(scrollDom: HTMLElement | null) {
    if (!scrollDom) {
      throw new Error('Scroll dom not found \n:) inside initCaret function')
    }
    scrollDom.onscroll = () => move()
  }

  function move(opts?: {
    duration: number
    delay: number
  }) {
    const { duration, delay } = opts || { duration: 0.0, delay: 0.0 }
    const { x, y, height } = getDefaultCaretRect()
      || { x: 0, y: 0, height: 0 }

    caretRef.style.height = height + 'px'
    caretRef.style.transition =
      `transform ${duration}s cubic-bezier(0.22, 0.68, 0, 1.21) ${delay}s`
    caretRef.style.transform = `translate(${x}px, ${y}px)`
  }

  editor.on('focus', () => {
    setShow(true)
    move()
  })

  editor.on('blur', () => {
    setShow(false)
  })

  editor.on('selectionUpdate', () => {
    move({ duration: 0.2, delay: 0 })
    hideOnSelection()
  })

  function hideOnSelection() {
    editor.state.selection.from === editor.state.selection.to
      ? setShow(true)
      : setShow(false)
  }

  editor.on('update', () => {
    move({ duration: 0.2, delay: 0 })
  })

  editor.on('destroy', () => {
    caretRef.remove()
  })

  return (
    <span
      id='caret'
      class={caretStyle()}
      ref={caretRef!}
    />
  )
}
