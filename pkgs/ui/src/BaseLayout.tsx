import { ParentComponent } from 'solid-js'

const BaseLayout: ParentComponent = (props) => {
  return <div class='flex flex-1 h-full'>{props.children}</div>
}

export { BaseLayout }
