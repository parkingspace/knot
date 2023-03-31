import { ParentComponent } from 'solid-js'
import { container } from './.css'

const Container: ParentComponent = (props) => {
  return <div class={container}>{props.children}</div>
}

export { Container }
