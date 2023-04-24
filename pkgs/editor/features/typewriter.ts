import './typewriter.css'

export function createTypewriter({
  dom,
}: {
  dom: HTMLElement
}) {
  return new Typewriter(dom)
}

export class Typewriter {
  dom: HTMLElement
  scroll: (y: number) => void
  constructor(dom: HTMLElement) {
    this.dom = dom
    // TODO: Maybe use smooth scroll library?
    // https://idiotwu.github.io/smooth-scrollbar/
    this.scroll = (y) => {
      const amount = y - window.innerHeight / 2
      this.dom.scrollBy({
        top: amount,
        behavior: 'smooth',
      })
    }
  }
}
