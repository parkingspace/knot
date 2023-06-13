import { createSignal } from 'solid-js'
import { useKnotEditor } from '..'
import type { Features } from '../types/configTypes'
import { useFeatureConfig } from './configStore'

import clsx from 'clsx'
import { Button, Icon } from 'ui'
import { initCaret } from './caret'
import { initHeader } from './header'
import { initSearch } from './search'
import { initSidebar } from './sidebar'
import { ColorSchemeToggleButton } from './theme/ColorSchemeToggleButton'
import { initTypewriter } from './typewriter'
import { initWhichkey } from './whichkey'

function FeatureToggleModal(props: {
  show: boolean
  toggle: () => void
}) {
  const { featureState, toggleFeature } = useFeatureConfig()

  return (
    <div
      class={clsx(
        'fixed inset-0 z-50 flex items-center justify-center backdrop-blur',
        {
          'hidden': !props.show,
        },
      )}
    >
      <div
        onclick={props.toggle}
        class='absolute inset-0 bg-black opacity-50'
      />
      <div class='relative bg-editorBg text-editorFg rounded-lg w-1/2'>
        <div class='p-6'>
          <div class='flex flex-col justify-between gap-2'>
            <div class='font-semibold mb-3'>Settings</div>
            <div class='flex flex-row gap-x-2 justify-between'>
              caret
              <Button onclick={() => toggleFeature('caret')}>
                {featureState.caret.enabled ? 'Disable' : 'Enable'}
              </Button>
            </div>
            <div class='flex flex-row gap-x-2 justify-between'>
              header
              <Button onclick={() => toggleFeature('header')}>
                {featureState.header.enabled ? 'Disable' : 'Enable'}
              </Button>
            </div>
            <div class='flex flex-row gap-x-2 justify-between'>
              search
              <Button onclick={() => toggleFeature('search')}>
                {featureState.search.enabled ? 'Disable' : 'Enable'}
              </Button>
            </div>
            <div class='flex flex-row gap-x-2 justify-between'>
              sidebar
              <Button onclick={() => toggleFeature('sidebar')}>
                {featureState.sidebar.enabled ? 'Disable' : 'Enable'}
              </Button>
            </div>
            <div class='flex flex-row gap-x-2 justify-between'>
              typewriter
              <Button onclick={() => toggleFeature('typewriter')}>
                {featureState.typewriter.enabled ? 'Disable' : 'Enable'}
              </Button>
            </div>
            <div class='flex flex-row gap-x-2 justify-between'>
              whichkey
              <Button onclick={() => toggleFeature('whichkey')}>
                {featureState.whichkey.enabled ? 'Disable' : 'Enable'}
              </Button>
            </div>
            <div class='flex flex-row gap-x-2 justify-between'>
              dark mode
              <ColorSchemeToggleButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Features() {
  const { featureState, toggleFeature } = useFeatureConfig()
  const { caret, header, search, sidebar, typewriter, whichkey } = featureState
  console.log("caret feature enabled?", caret.enabled)
  const [showModal, setShowModal] = createSignal(false)
  const toggle = () => setShowModal(!showModal())

  const { editor } = useKnotEditor()
  editor.view.dom.spellcheck = false

  return (
    <>
      <FeatureToggleModal show={showModal()} toggle={toggle} />
      <div class='fixed top-0 right-0 z-50 text-editorFg p-4 font-semibold'>
        <Button onclick={() => toggle()} size='icon'>
          <Icon name='IconSettings' />
        </Button>
      </div>

      {caret.enabled && initCaret()}
      {header.enabled && initHeader()}
      {search.enabled && initSearch()}
      {sidebar.enabled && initSidebar()}
      {typewriter.enabled && initTypewriter()}
      {whichkey.enabled && initWhichkey()}
    </>
  )
}
