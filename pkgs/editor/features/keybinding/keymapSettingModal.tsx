import './keymapSettingModal.css'

export function KeymapSettingModal(props: {
  show: boolean
  toggle: (show: boolean) => void
}) {
  return (
    <div class={props.show ? 'show KeymapSettingModal' : 'KeymapSettingModal'}>
      <span class='close' onclick={() => props.toggle(false)}>&times;</span>
      <p>Some text in the Modal..</p>
    </div>
  )
}
