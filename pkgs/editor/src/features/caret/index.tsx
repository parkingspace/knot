import clsx from 'clsx'
import { createEffect, createSignal, onCleanup, onMount, Show } from 'solid-js'
import { useKnotEditor } from '../../Editor'

/**
 * Get the global position of the default caret and return it as an object.
 *
 * @returns the global position of the default caret or undefined
 */
export function getDefaultCaretRect() {
  let r

  const s = document.getSelection()
  if (
    s?.anchorNode === document.getElementById('caret')
  ) {
    console.log('anchorNode is same as default caret')
    return
  }

  if (!s || s?.rangeCount === 0) {
    console.log('caret range is 0 return')
    return
  }
  r = s.getRangeAt(0)

  if (!r) {
    console.log('caret range is null return')
    return
  }

  console.log('Caret Starts move, Is it nessasary? Fix it later')

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

  return { x: rect.right, y: rect.y, height: rect.height }
}

const blinkFrames = {
  opacity: [0, 1],
  offset: [0.7, 1],
  easing: 'ease-out',
}

const blinkOptions = {
  duration: 1200,
  iterations: Infinity,
}

export function Caret(props: {
  editor: any
}) {
  let caretBlinkAnimation: Animation

  const editor = useKnotEditor()

  onMount(() => {
    const span = document.createElement('span')
    span.id = 'caret'
    span.className =
      'absolute w-1 bg-caretColor z-50 rounded-sm pointer-events-none block'
    span.style.top = '0px'
    span.style.left = '0px'
    span.style.height = '0px'
    span.style.transition = 'transform 0.0s cubic-bezier(0.4, 0, 0.2, 1) 0.0s'

    document.getElementById('root')!.appendChild(span)

    addScrollListener(document.getElementById('root'))
    removeDefaultCaret()
    move()
    initBlinkAnimation()
    console.log('caret is mounted', document.getElementById('caret'))
  })

  onCleanup(() => {
    console.log('caret is unmounted')
    const caret = document.getElementById('caret')!

    removeScrollListener(document.getElementById('root'))
    caret.remove()
  })

  function initBlinkAnimation() {
    caretBlinkAnimation = document.getElementById('caret')!.animate(
      blinkFrames,
      blinkOptions,
    )
  }

  function removeDefaultCaret() {
    document.getElementById('root')!.style.caretColor = 'transparent'
  }

  const moveOnScroll = () => move()
  function addScrollListener(scrollDom: HTMLElement | null) {
    if (!scrollDom) {
      throw new Error('Scroll dom not found \n:) inside initCaret function')
    }
    scrollDom.addEventListener('scroll', moveOnScroll)
  }
  function removeScrollListener(scrollDom: HTMLElement | null) {
    if (!scrollDom) {
      throw new Error('Scroll dom not found \n:) inside initCaret function')
    }
    scrollDom.removeEventListener('scroll', moveOnScroll)
  }

  function move(opts?: {
    duration: number
    delay: number
  }) {
    const { duration, delay } = opts || { duration: 0.0, delay: 0.0 }
    const { x, y, height } = getDefaultCaretRect()
      || { x: 0, y: 0, height: 0 }
    const caret = document.getElementById('caret')!

    caret.style.height = height + 'px'
    caret.style.top = y + 'px'
    caret.style.left = x + 'px'
    caret.style.transition =
      `transform ${duration}s cubic-bezier(0.22, 0.68, 0, 1.21) ${delay}s,
       height .1s ease-in-out 0s`

    // document.getElementById('caret').style.transform = `translate(${x}px, ${y}px)`
    console.log('caret is moved to', caret.style.top)
  }

  editor.editor.on('selectionUpdate', () => {
    console.log('seelection update')
    move({ duration: 0.2, delay: 0 })
  })

  editor.editor.on('destroy', () => {
    document.getElementById('caret')!.remove()
  })

  return <></>
}
