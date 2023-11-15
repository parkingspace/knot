import clsx from 'clsx'
import { Accessor, createSignal } from 'solid-js'
import { createContext, createEffect, onMount, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Button, Icon } from 'ui'
import { ColorSchemeToggleButton } from '../features/theme/ColorSchemeToggleButton'
import { Paper } from '../Paper'
import type { FeatureName, Features } from '../types/configTypes'
import { useDocumentManager } from './documentManager'

import { initHeader } from '../features/header'
import { initSearch } from '../features/search'
import { initTypewriter } from '../features/typewriter'
import { initWhichkey } from '../features/whichkey'

function InputBar(props: {
  type: Accessor<'search' | 'add'>
}) {
  const [searchResult, setSearchResult] = createSignal<string[]>([])
  // const dm = useDocumentManager()

  createEffect(() => {
    // console.log('searchable docs', dm.searchableDocs)
    console.log('type', props.type())
  })

  return (
    <div class='p-4 w-full bg-transparent' onkeydown={(e) => {}}>
      <div class='border w-full flex flex-row bg-editorBg text-editorFg'>
        <Paper />
        <Button size='icon'>
          {props.type() === 'add'
            ? <Icon name='IconPlus' />
            : <Icon name='IconSearch' />}
        </Button>
      </div>
    </div>
  )
}

export function ToolBelt() {
  const [showModal, setShowModal] = createSignal(false)
  const [inputType, setInputType] = createSignal<'search' | 'add'>('search')
  const toggle = () => setShowModal(!showModal())

  return (
    <>
      <FeatureToggleModal
        show={showModal()}
        toggle={() => toggle()}
      />
      <div class='flex flex-col fixed z-20 bottom-0 w-full'>
        <InputBar type={inputType} />
        <div class='flex flex-row gap-8 bg-editorBg justify-center w-full'>
          <Button
            size='icon'
            onclick={() => console.log('clicked')}
          >
            <Icon name='IconWorld' />
          </Button>
          <SettingsButton toggle={toggle} />
        </div>
      </div>
    </>
  )
}

function SettingsButton(props: {
  toggle: () => void
}) {
  return (
    <div class='relative top-0 right-0 z-50 text-editorFg p-2 font-semibold'>
      <Button onclick={() => props.toggle()} size='icon'>
        <Icon name='IconSettings' />
      </Button>
    </div>
  )
}

function FeatureToggleModal(props: {
  show: boolean
  toggle: () => void
}) {
  const configurationManager = useConfigurationManager()

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
              <Button onclick={() => configurationManager.toggle('caret')}>
                {configurationManager.features.caret.enabled
                  ? 'Disable'
                  : 'Enable'}
              </Button>
            </div>
            <div class='flex flex-row gap-x-2 justify-between'>
              header
              <Button onclick={() => configurationManager.toggle('header')}>
                {configurationManager.features.header.enabled
                  ? 'Disable'
                  : 'Enable'}
              </Button>
            </div>
            <div class='flex flex-row gap-x-2 justify-between'>
              search
              <Button onclick={() => configurationManager.toggle('search')}>
                {configurationManager.features.search.enabled
                  ? 'Disable'
                  : 'Enable'}
              </Button>
            </div>
            <div class='flex flex-row gap-x-2 justify-between'>
              sidebar
              <Button onclick={() => configurationManager.toggle('sidebar')}>
                {configurationManager.features.sidebar.enabled
                  ? 'Disable'
                  : 'Enable'}
              </Button>
            </div>
            <div class='flex flex-row gap-x-2 justify-between'>
              typewriter
              <Button onclick={() => configurationManager.toggle('typewriter')}>
                {configurationManager.features.typewriter.enabled
                  ? 'Disable'
                  : 'Enable'}
              </Button>
            </div>
            <div class='flex flex-row gap-x-2 justify-between'>
              whichkey
              <Button onclick={() => configurationManager.toggle('whichkey')}>
                {configurationManager.features.whichkey.enabled
                  ? 'Disable'
                  : 'Enable'}
              </Button>
            </div>
            <div class='flex flex-row gap-x-2 justify-between'>
              color scheme

              <ColorSchemeToggleButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const configurationManager = () => {
  const defaultFeatures: Features = {
    'caret': { enabled: true },
    'whichkey': { enabled: true },
    'typewriter': { enabled: true },
    'sidebar': { enabled: true },
    'search': { enabled: true },
    'header': { enabled: true },
  }

  createEffect(() => {
    console.log('feature state is changed and set localStorage', configuration)
    if (!configuration.features.caret.enabled) {
      document.getElementById('root')!.style.caretColor = ''
    }
    localStorage.setItem('features', JSON.stringify(configuration.features))
  })

  const localState = localStorage.getItem('features')
    ? JSON.parse(localStorage.getItem('features') as string) as Features
    : null

  const [configuration, setConfiguration] = createStore({
    features: localState ?? defaultFeatures,
    toggle: (feature: FeatureName) =>
      setConfiguration((prev: {
        features: Features
        toggle: (feature: FeatureName) => void
      }) => ({
        features: {
          ...prev.features,
          [feature]: { enabled: !prev.features[feature].enabled },
        },
      })),
  })

  return configuration
}

type ConfigurationManager = ReturnType<typeof configurationManager>
const ConfigurationManagerContext = createContext<ConfigurationManager>()

export const ConfigurationManagerProvider = (props: { children: any }) => {
  const config = configurationManager()
  return (
    <ConfigurationManagerContext.Provider value={config}>
      {config.features.search.enabled && initSearch()}
      {config.features.whichkey.enabled && initWhichkey()}
      {config.features.typewriter.enabled && initTypewriter()}
      {props.children}
    </ConfigurationManagerContext.Provider>
  )
}

export const useConfigurationManager = () => {
  const context = useContext(ConfigurationManagerContext)
  if (!context) {
    throw new Error(
      'useConfigurationManager must be used within a ConfigurationManagerProvider',
    )
  }
  return context
}
