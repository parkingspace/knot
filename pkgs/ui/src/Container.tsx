import { ParentComponent } from 'solid-js'

const Container: ParentComponent = (props) => {
  return <div>{props.children}</div>
}

const FlexContainer: ParentComponent = (props) => {
  return <div>{props.children}</div>
}

export { Container, FlexContainer }
