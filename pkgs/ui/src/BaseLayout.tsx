import { ParentComponent } from 'solid-js'

const BaseLayout: ParentComponent = (props) => {
  return <div class='flex '>{props.children}</div>
}

export { BaseLayout }
