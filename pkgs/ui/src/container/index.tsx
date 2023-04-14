import { ParentComponent } from 'solid-js'
import { container, flexContainer } from './.css'

const Container: ParentComponent = (props) => {
  return <div class={container}>{props.children}</div>
}

const FlexContainer: ParentComponent = (props) => {
  return <div class={flexContainer}>{props.children}</div>
}

export { Container, FlexContainer }
