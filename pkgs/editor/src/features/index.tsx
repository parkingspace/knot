import {
  children,
  Component,
  createSignal,
  For,
  JSXElement,
  Show,
} from 'solid-js'
import { useKnotEditor } from '..'
import type { FeatureName, Features, FeatureTypes } from '../types/configTypes'
import { useFeatureConfig } from './configStore'

import clsx from 'clsx'
import { initCaret } from './caret'
import { initHeader } from './header'
import { initSearch } from './search'
import { initSidebar } from './sidebar'
import { initTypewriter } from './typewriter'
import { initWhichkey } from './whichkey'

function FeatureToggleModal(props: {
  show: boolean
  toggle: () => void
}) {
  const { featureState, toggleFeature } = useFeatureConfig()

  return (
    <div
      class={clsx('fixed inset-0 z-50 flex items-center justify-center', {
        'hidden': !props.show,
      })}
    >
      <div onclick={props.toggle} class='absolute inset-0 bg-black opacity-50'></div>
      <div class='relative bg-white rounded-lg w-1/2'>
        <div class='p-4'>
          <div class='flex flex-col justify-between'>
            <div class='font-semibold'>Features</div>
            <div class='flex flex-row gap-x-2 justify-between'>
              caret
              <button onclick={() => toggleFeature('caret')}>
                {featureState.caret.enabled ? 'Disable' : 'Enable'}
              </button>
            </div>
            <div class='flex flex-row gap-x-2 justify-between'>
              header
              <button onclick={() => toggleFeature('header')}>
                {featureState.header.enabled ? 'Disable' : 'Enable'}
              </button>
            </div>
            <div class='flex flex-row gap-x-2 justify-between'>
              search
              <button onclick={() => toggleFeature('search')}>
                {featureState.search.enabled ? 'Disable' : 'Enable'}
              </button>
            </div>
            <div class='flex flex-row gap-x-2 justify-between'>
              sidebar
              <button onclick={() => toggleFeature('sidebar')}>
                {featureState.sidebar.enabled ? 'Disable' : 'Enable'}
              </button>
            </div>
            <div class='flex flex-row gap-x-2 justify-between'>
              typewriter
              <button onclick={() => toggleFeature('typewriter')}>
                {featureState.typewriter.enabled ? 'Disable' : 'Enable'}
              </button>
            </div>
            <div class='flex flex-row gap-x-2 justify-between'>
              whichkey
              <button onclick={() => toggleFeature('whichkey')}>
                {featureState.whichkey.enabled ? 'Disable' : 'Enable'}
              </button>
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
  const [showModal, setShowModal] = createSignal(false)
  const toggle = () => setShowModal(!showModal())

  const { editor } = useKnotEditor()
  editor.view.dom.spellcheck = false

  return (
    <>
      <FeatureToggleModal show={showModal()} toggle={toggle} />
      <div class='fixed bottom-0 left-0 z-50 text-editorFg p-4 font-semibold'>
        <button onclick={() => toggle()}>
          Feature
        </button>
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
