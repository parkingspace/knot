import CodeBlock from '@tiptap/extension-code-block-lowlight'
import { lowlight } from 'lowlight'
import { editorShortcuts } from '../features/keybinding'
import functions from './functions'
import marks from './marks'
import nodes from './nodes'

const extensions = [
  ...nodes,
  ...marks,
  ...functions,
]
  .map((extension) => {
    if (editorShortcuts[extension.name]) {
      const extended = extension.extend({
        addKeyboardShortcuts(this) {
          return editorShortcuts[extension.name].reduce(
            (a, v) => {
              return {
                ...a,
                [v.key]: () => {
                  if (v.commandKey === 'toggleHeading') {
                    return (this
                      .editor
                      .commands[v.commandKey] as (
                        options: { level: number },
                      ) => boolean)({
                        level: 1,
                      })
                  }
                  if (v.commandKey === 'setTextAlign') {
                    const direction = v.description.split(' ').pop()
                    console.log('direction:', direction)
                    return (this.editor.commands[v.commandKey] as (
                      direction: string,
                    ) => any)(direction!)
                  }
                  return (this
                    .editor
                    .commands[v.commandKey] as () => boolean)()
                },
              }
            },
            {},
          )
        },
      })
      if (extension.name === 'codeBlock') {
        return (extended as typeof CodeBlock).configure({
          lowlight: lowlight,
        })
      }
      return extended
    }
    return extension
  })

export default extensions
