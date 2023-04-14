import { ParentComponent } from 'solid-js'
import flex from './.css'

const Flex: ParentComponent = (props) => {
  return <div class={flex}>{props.children}</div>
}

export { Flex }
