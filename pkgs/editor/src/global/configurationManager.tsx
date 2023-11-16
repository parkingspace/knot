import clsx from 'clsx'
import { Accessor, createSignal, For, Setter, Show } from 'solid-js'
import { createContext, createEffect, onMount, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Button, Icon } from 'ui'
import { ColorSchemeToggleButton } from '../features/theme/ColorSchemeToggleButton'
import { Paper } from '../Paper'
import type { FeatureName, Features } from '../types/configTypes'

import { useCabinetContext } from '../Cabinet'
import { initHeader } from '../features/header'
import { initSearch } from '../features/search'
import { initTypewriter } from '../features/typewriter'
import { initWhichkey } from '../features/whichkey'

function AddFileInput(props: {
  setShow: Setter
}) {
  const [searchResult, setSearchResult] = createSignal([])
  const [selectedResult, setSelectedResult] = createSignal()
  const cabinet = useCabinetContext()

  return (
    <div class='fixed z-50 bottom-0 w-full bg-editorBg text-editorFg'>
      <Show when={searchResult()}>
        <div class='max-h-52 overflow-y-scroll'>
          <For each={searchResult()}>
            {(res, i) => (
              <div
                onClick={(e) => {
                  setSelectedResult(res)
                }}
                class='p-4 border border-transparent border-t-gray-500 hover:bg-black cursor-pointer select-none'
              >
                {res.name}
              </div>
            )}
          </For>
        </div>
      </Show>

      <div class='w-full flex flex-row border border-transparent border-t-gray-500'>
        <Paper
          search={setSearchResult}
          selected={selectedResult}
          // onBlur={(e) => {
          //   props.setShow(false)
          // }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              props.setShow(false)
            }
            if (e.key === 'Enter') {
              const edt = e.target.editor as Editor
              const text = edt.getText().trim()
              if (!text) {
                props.setShow(false)
              } else {
                const now = (new Date())
                  .toISOString()
                  .slice(0, 19)
                  .replace(/-/g, '/')
                  .replace('T', ' ')

                cabinet.addFile({
                  id: Date.now(),
                  name: text,
                  contents: text,
                  created: now,
                  edited: now,
                })
                props.setShow(false)
              }
            }
          }}
        />
        <Button size='icon'>
          {searchResult().length === 0
            ? <Icon name='IconPlus' />
            : <Icon name='IconSearch' />}
        </Button>
      </div>
    </div>
  )
}

export function ToolBelt() {
  const [showModal, setShowModal] = createSignal(false)
  const [showAdd, setShowAdd] = createSignal(false)
  const toggle = () => setShowModal(!showModal())

  return (
    <>
      <FeatureToggleModal
        show={showModal()}
        toggle={() => toggle()}
      />
      <Show when={showAdd()}>
        <AddFileInput setShow={setShowAdd} />
      </Show>
      <div class='flex flex-col fixed z-20 bottom-0 w-full border border-t-gray-500 border-x-transparent border-b-transparent'>
        <div class='flex flex-row gap-8 bg-editorBg justify-center w-full'>
          <div class='p-2'>
            <Button
              size='icon'
              onclick={() => console.log('clicked')}
            >
              <Icon name='IconWorld' />
            </Button>
          </div>
          <div class='p-2'>
            <Button
              size='icon'
              onclick={() => setShowAdd(true)}
            >
              <Icon name='IconPlus' />
            </Button>
          </div>
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
