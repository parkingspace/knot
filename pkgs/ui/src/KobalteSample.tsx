import { Popover as KPopover } from '@kobalte/core'
import { JSX } from 'solid-js'

type propType = JSX.HTMLAttributes<HTMLDivElement>
type Component = (props: propType & { ref?: HTMLDivElement }) => JSX.Element

const KobalteSample: Component = (props) => {
  return (
    <KPopover.Root>
      <KPopover.Trigger class='bg-sky-300 m-3 inline-flex px-4 py-2 rounded ui-disabled:bg-slate-100'>
        Open
      </KPopover.Trigger>
      <KPopover.Content class='flex p-4 rounded bg-white'>
        Content goes here
      </KPopover.Content>
    </KPopover.Root>
  )
}

export { KobalteSample }
