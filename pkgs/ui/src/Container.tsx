import { ParentComponent } from 'solid-js'

const Container: ParentComponent = (props) => {
  return <div>{props.children}</div>
}

const FlexContainer: ParentComponent = (props) => {
  return (
    <div class='overflow-hidden flex flex-col w-full h-full m-0 p-0'>
      {props.children}
    </div>
  )
}

export { Container, FlexContainer }
