import CodeBlock from '@tiptap/extension-code-block-lowlight'
import { lowlight } from 'lowlight'

import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import dockerfile from 'highlight.js/lib/languages/dockerfile'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import markdown from 'highlight.js/lib/languages/markdown'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import yaml from 'highlight.js/lib/languages/yaml'


lowlight.registerLanguage('javascript', javascript)
lowlight.registerLanguage('typescript', typescript)
lowlight.registerLanguage('json', json)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('html', xml)
lowlight.registerLanguage('xml', xml)
lowlight.registerLanguage('markdown', markdown)
lowlight.registerLanguage('yaml', yaml)
lowlight.registerLanguage('bash', bash)
lowlight.registerLanguage('shell', bash)
lowlight.registerLanguage('sh', bash)
lowlight.registerLanguage('dockerfile', dockerfile)
lowlight.registerLanguage('docker', dockerfile)

const codeBlock = CodeBlock
  .extend({
    addKeyboardShortcuts() {
      return {
        'Mod-Alt-c': () => this.editor.commands.toggleCodeBlock(),
      }
    },
  })
  .configure({ lowlight: lowlight })

export default codeBlock
