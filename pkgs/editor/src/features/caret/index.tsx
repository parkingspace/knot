import clsx from 'clsx'
import { createEffect, createSignal, onCleanup, onMount } from 'solid-js'
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

export function Caret() {
  let blinkAnimation: Animation
  const blinkAnimationDuation: number = 1100
  let caret: HTMLDivElement
  let typingChecker: NodeJS.Timer

  const [lastMoved, setLastMoved] = createSignal<number>(0)
  const [isTyping, setIsTyping] = createSignal(false)

  const { editors } = useDocumentManager()

  const moveCb = (e: any) => {
    if (e.event) {
      if (e.event.type === 'blur') {
        caret.style.visibility = 'hidden'
        return
      }
      if (e.event.type === 'focus') {
        caret.style.visibility = 'visible'
        return move({ duration: 0 })
      }
    }
    move()
  }

  createEffect(() => {
    console.log('editor count is changed', editors.length)
    addEventListeners()
  })

  function addEventListeners() {
    editors.forEach(e => {
      e.handler.on('selectionUpdate', moveCb)
      e.handler.on('focus', moveCb)
      e.handler.on('blur', moveCb)
    })
    getRootElement().addEventListener('scroll', moveCb)
  }

  function removeEventListeners() {
    editors.forEach(e => {
      e.handler.off('selectionUpdate', moveCb)
      e.handler.off('focus', moveCb)
      e.handler.off('blur', moveCb)
    })
    getRootElement().removeEventListener('scroll', moveCb)
  }

  function checkTyping() {
    const diff = Date.now() - lastMoved()
    setIsTyping(diff < 500)
  }

  createEffect(() => {
    if (isTyping()) {
      console.log('start typing')
      console.log('ani current time', blinkAnimation.currentTime)
      blinkAnimation.currentTime = blinkAnimationDuation - 50
      // requestAnimationFrame(() => blinkAnimation.pause())
      blinkAnimation.pause()
    } else if (blinkAnimation) {
      console.log('stop typing')
      if (blinkAnimation.playState === 'paused') {
        console.log('ani start time', blinkAnimation.currentTime)
        blinkAnimation.play()
      }
    }
  }, false)

  onMount(() => {
    setDefaultCaret('transparent')
    initBlinkAnimation()

    typingChecker = setInterval(checkTyping, 100)
  })

  onCleanup(() => {
    console.log('cleanup ---------------------')
    setDefaultCaret('')
    removeEventListeners()
    clearInterval(typingChecker)
  })

  function move(opts?: { duration: number }) {
    if (!caret) {
      return
    }
    let { duration } = opts || { duration: 150 }
    const now = Date.now()

    if (isTyping() && now - lastMoved() < 100) {
      duration = 0
    }

    setLastMoved(now)

    const { x, y, height } = getDefaultCaretRect()
      || { x: 0, y: 0, height: 0 }
    const r = caret.getBoundingClientRect()

    const xChanged = r.x !== x
    const yChanged = r.y !== y
    const hChanged = r.height !== height

    if (
      !xChanged && !yChanged && !hChanged
    ) {
      return
    }

    const options: KeyframeAnimationOptions = {
      duration: duration,
      easing: 'cubic-bezier(0.22, 0.68, 0, 1.21)',
      fill: 'forwards',
    }
    let keyframes: Keyframe[] = []

    const onlyYChanged = yChanged && !xChanged && !hChanged
    const onlyXChanged = !yChanged && xChanged && !hChanged
    const onlyHChanged = !yChanged && !xChanged && hChanged

    if (onlyYChanged) {
      keyframes = [
        { top: `${r.y}px` },
        { top: `${y}px` },
      ]
    } else if (onlyXChanged) {
      keyframes = [
        { left: `${r.x}px` },
        { left: `${x}px` },
      ]
    } else if (onlyHChanged) {
      keyframes = [
        { height: `${r.height}px` },
        { height: `${height}px` },
      ]
    } else {
      keyframes = [
        {
          top: `${r.y}px`,
          left: `${r.x}px`,
          height: `${r.height}px`,
        },
        { top: `${y}px`, left: `${x}px`, height: `${height}px` },
      ]
    }

    caret.animate(keyframes, options)

    return
  }

  function initBlinkAnimation() {
    const blinkFrames = {
      // opacity: [0.2, 1],
      // borderRadius: ['2px', '0px'],
      width: ['12px', '2px'],
      offset: [0.01, 0.49, 0.5],
      easing: ['ease-out', 'step-end'],
      // easing: 'steps(2, jump-both)',
      // easing: 'ease-in',
    }

    const blinkOptions = {
      duration: blinkAnimationDuation,
      iterations: Infinity,
    }

    blinkAnimation = caret.animate(
      blinkFrames,
      blinkOptions,
    )
  }

  function setDefaultCaret(color: string) {
    getRootElement().style.caretColor = color
  }

  function getRootElement() {
    const r = document.getElementById('root')
    if (!r) {
      throw new Error('Element not found \n:) inside initCaret function')
    }
    return r
  }

  return (
    <div
      ref={caret!}
      class={clsx(
        'top-0 left-0 h-0 absolute w-2 bg-caretColor z-50 pointer-events-none',
        {
          'mix-blend-difference': !isTyping(),
        },
      )}
    />
  )
}
