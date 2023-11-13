import clsx from 'clsx'
import { createEffect, createSignal, onCleanup, onMount, Show } from 'solid-js'
import { useKnotEditor } from '../../Editor'
import { useDocumentManager } from '../../global/documentManager'

/**
 * Get position of default caret and return it as an object.
 *
 * @returns x, y, height
 */
export function getDefaultCaretRect() {
  let r
  const s = document.getSelection()

  if (
    s?.anchorNode === document.getElementById('caret')
  ) {
    return
  }

  if (!s || s?.rangeCount === 0) {
    return
  }
  r = s.getRangeAt(0)

  if (!r) {
    return
  }

  const node = r.startContainer
  const content = node.textContent
  const offset = r.startOffset

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

interface CaretElement extends Partial<HTMLElement> {
  position: {}
  style: CSSStyleDeclaration
  animate: (a: any, b: any) => Animation
  remove: () => void
  hide: () => void
  show: () => void
  move: (opts?: {
    duration: number
    delay: number
  }) => void
  isTransitioning: boolean
}

export function Caret() {
  let blink: Animation
  const [caret, setCaret] = createSignal<CaretElement>()
  const [lastMoved, setLastMoved] = createSignal<number>()

  const { editors } = useDocumentManager()
  const rootEl = document.getElementById('root')

  console.log('outside')

  onMount(() => {
    console.log('onMount')
    const c = createCustomCaret()
    editors.forEach((e) => {
      e.on('selectionUpdate', () => c.move({ duration: 200, delay: 0 }))
      e.on('focus', () => {
        c.show()
        c.move()
      })
      e.on('blur', () => c.hide())
    })
  })

  onCleanup(() => {
    console.log('onCleanup')
    caret()?.remove()
    document.getElementById('caret')?.remove()
    removeMoveOnScroll()
  })

  function createCustomCaret() {
    hideDefaultCaret()
    const span = document.createElement('span')
    span.id = 'caret'
    span.className =
      'absolute w-1 bg-caretColor z-50 rounded-sm pointer-events-none block'
    span.style.top = '0px'
    span.style.left = '0px'
    span.style.height = '0px'

    getRootElement().appendChild(span)
    // initBlinkAnimation(span)

    const c = span as CaretElement
    span.addEventListener('transitionstart', () => {
      c.isTransitioning = true
    })
    span.addEventListener('transitionend', () => {
      c.isTransitioning = false
    })
    span.addEventListener('transitioncancel', () => {
      c.isTransitioning = false
    })

    c.hide = () => c.style.visibility = 'hidden'
    c.show = () => c.style.visibility = 'visible'
    c.move = (opts?: {
      duration: number
      delay: number
    }) => {
      const c = caret() as HTMLSpanElement
      if (!c) {
        return
      }

      let { duration } = opts || { duration: 0.0 }
      const now = Date.now()
      const moveDelay = now - lastMoved()
      if (moveDelay < duration) {
        duration = 0
      }

      const { x, y, height } = getDefaultCaretRect()
        || { x: 0, y: 0, height: 0 }

      if (
        c.offsetLeft === x && c.offsetTop === y && c
            .offsetHeight === height
      ) {
        return
      }

      const options: KeyframeAnimationOptions = {
        duration: duration,
        easing: 'cubic-bezier(0.22, 0.68, 0, 1.21)',
        fill: 'forwards',
      }
      let keyframes: Keyframe[] = []

      const xChanged = c.offsetLeft !== x
      const yChanged = c.offsetTop !== y
      const hChanged = c.offsetHeight !== height

      const onlyYChanged = yChanged && !xChanged && !hChanged
      const onlyXChanged = !yChanged && xChanged && !hChanged
      const onlyHChanged = !yChanged && !xChanged && hChanged

      if (onlyYChanged) {
        keyframes = [
          { top: `${c.offsetTop}px` },
          { top: `${y}px` },
        ]
      } else if (onlyXChanged) {
        keyframes = [
          { left: `${c.offsetLeft}px` },
          { left: `${x}px` },
        ]
      } else if (onlyHChanged) {
        keyframes = [
          { height: `${c.offsetHeight}px` },
          { height: `${height}px` },
        ]
      } else {
        keyframes = [
          {
            top: `${c.offsetTop}px`,
            left: `${c.offsetLeft}px`,
            height: `${c.offsetHeight}px`,
          },
          { top: `${y}px`, left: `${x}px`, height: `${height}px` },
        ]
      }

      c.animate(keyframes, options)

      return setLastMoved(now)

      // if (blink.playState === 'running') {
      //   blink.cancel()
      // }

      // if (!isTransitioning) {
      //   console.log('--- jumping')
      //   style.transition =
      //     `left ${duration}ms cubic-bezier(0.22, 0.68, 0, 1.21) ${delay}ms, height .1s ease-in-out 0s`
      //   style.top = y + 'px'
      //   style.left = x + 'px'
      // } else {
      //   console.log('--- transitioning')
      // }
      // console.log('c is now', )

      // console.log(c.getAnimations())

      // if (blink.playState === 'running' && isTransitioning) {
      //   blink.currentTime = 0
      // } else {
      //   // console.log('currentTime', blink.currentTime)
      //   // setTimeout(() => blink.play(), duration)
      // }
    }

    addMoveOnScroll()
    setCaret(c)
    return c
  }

  function initBlinkAnimation(el: HTMLElement) {
    // ['ease-in', 'ease-out'],
    // easing: ['step-start', 'step-end']
    const blinkFrames = {
      opacity: [0, 1],
      scale: [0, 1],
      offset: [0.5, 1],
      // easing: ['step-start', 'ease-in'],
      // easing: 'steps(2, jump-both)',
      easing: 'ease-out',
    }

    const blinkOptions = {
      duration: 2000,
      iterations: Infinity,
    }

    blink = el.animate(
      blinkFrames,
      blinkOptions,
    )
  }

  function hideDefaultCaret() {
    getRootElement().style.caretColor = 'transparent'
  }

  const moveOnScroll = () => caret()?.move()

  function getRootElement() {
    if (!rootEl) {
      throw new Error('Element not found \n:) inside initCaret function')
    }
    return rootEl
  }

  function addMoveOnScroll() {
    getRootElement().addEventListener('scroll', moveOnScroll)
  }

  function removeMoveOnScroll() {
    getRootElement().removeEventListener('scroll', moveOnScroll)
  }

  return <></>
}
