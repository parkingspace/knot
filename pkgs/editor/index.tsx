import './editor.css'
import clsx from 'clsx'
import { createTiptapEditor } from 'solid-tiptap'
import { BaseLayout, Sidebar, TextArea } from 'ui'

import { onMount } from 'solid-js'
import { WhichKeyModal } from './features/keybinding'
import {
  createEditorKeymap,
  useEditorKeymap,
} from './features/keybinding/keymapStore'
import { createKnotCaret, KnotCaret } from './features/knotCaret'
import { createTypewriter, Typewriter } from './features/typewriter'
import extensions from './tiptap_extensions'

const sampleText =
  `<h1>Telecommunication</h1><p>Given that images have always been used to affect reality, does telepresence bring anything new? A map, for instance, already allows for a kind of teleaction: it can be used to predict the future and therefore to change it. To quote Latour again, "one cannot smell or hear or touch Sakhalin Island, but you can look at the map and determine at which bearing you will see the land when you send the next fleet." </p><p>In my view, there are two fundamental differences. Because telepresence involves electronic transmission of video images, the constructions of representations takes place instantaneously. Making a perspectival drawing or a chart, taking a photograph or shooting film takes time. Now I can use a remote video camera which capture images in real-time, sending these images back to me without any delay. This allows me to monitor any visible changes in a remote location (weather conditions, movements of troops, and so on), adjusting my actions accordingly. Depending upon what information I need, radar can be used instead of a video camera as well. In either case, an image-instrument displayed by a real-time screen (see “Screen” section) is formed in real time. The second difference is directly related to the first. The ability to receive visual information about a remote place in real time allows us to manipulate physical reality in this place, also in real-time. </p><p>If power, according to Latour, includes the ability to manipulate resources at a distance, then teleaction provides a new and unique kind of power: real-time remote control. I can drive a toy vehicle, repair a space station, do underwater excavation, operate on a patient or kill — all from a distance.</p><p>What technology is responsible for this new power? Since teleoperator typically acts with the help of a live video image (for instance, when remotely operating a moving vehicle such as in the opening sequence of "Titanic"), we may think at first that it is the technology of video, or, more precisely, of television. The original nineteenth century meaning of television was "vision over distance." Only after 1920s, when television was equated with broadcasting, does this meaning fade away. However, during the preceding half a century (television research begins in the 1870s), television engineers were mostly concerned with the problem of how to transmit consecutive images of a remote location to enable "remote seeing."</p>`

export function Editor() {
  let editorRef: HTMLDivElement
  let knotCaret: KnotCaret
  let typewriter: Typewriter

  const editorStyle = clsx(
    'prose max-w-none lg:prose-md lg:max-w-4xl leading-relaxed text-gray-700 outline-transparent w-full min-h-screen h-fit p-editor',
  )
  const keymap = useEditorKeymap()

  onMount(() => {
    createTiptapEditor(() => ({
      element: editorRef,
      extensions: extensions,
      content: sampleText,
      editorProps: {
        attributes: {
          class: editorStyle,
        },
      },
      onCreate({ editor }) {
        if (keymap) {
          createEditorKeymap(editor, keymap)
        }
        knotCaret = createKnotCaret()
        typewriter = createTypewriter({ dom: editor.view.dom })
        editor.view.dom.addEventListener(
          'scroll',
          () => knotCaret.move({ delay: 0, duration: 0 }),
        )
        editor.view.dom.spellcheck = false
      },
      onFocus() {
        knotCaret.show()
      },
      onBlur() {
        knotCaret.hide()
      },
      onDestroy() {
        knotCaret.destroy()
      },
      onSelectionUpdate() {
        typewriter.scroll(
          knotCaret
            .move({ delay: 0, duration: 0.2 })
            .y,
        )
      },
      onUpdate() {
        knotCaret
          .move({ delay: 0, duration: 0.2 })
      },
    }))
  })

  return (
    <BaseLayout>
      <Sidebar />
      <TextArea ref={editorRef!} />
      <WhichKeyModal />
    </BaseLayout>
  )
}
