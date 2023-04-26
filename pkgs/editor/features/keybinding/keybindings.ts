import type { SingleCommands } from '@tiptap/core'
/**
 * This is a list of all the commands that are available in the editor.
 * The commands are grouped by their category.
 *
 * mod is a meta key,
 * Command key on macOS
 * Control key on Windows and Linux.
 *
 * @category Commands
 */

type CommandKey = keyof SingleCommands
export type EditorShortcuts = {
  [key: string]: {
    key: string
    commandKey: CommandKey
    description: string
  }[]
}

export const editorShortcuts: EditorShortcuts = {
  'paragraph': [{
    key: 'Alt-0',
    commandKey: 'setParagraph',
    description: 'Transforms node to paragraphs.',
  }],
  'listItem': [{
    key: 'Shift-Enter',
    commandKey: 'splitListItem',
    description: 'split list item',
  }, {
    key: 'Tab',
    commandKey: 'sinkListItem',
    description: 'sink list item',
  }, {
    key: 'Shift-Tab',
    commandKey: 'liftListItem',
    description: 'lift list item',
  }],
  'heading': [{
    key: 'Mod-Alt-1',
    commandKey: 'toggleHeading',
    description: 'toggle heading node',
  }],
  'blockquote': [{
    key: 'Mod-Shift-b',
    commandKey: 'toggleBlockquote',
    description: 'toggle the blockquote',
  }],
  'codeBlock': [{
    key: 'Mod-Alt-c',
    commandKey: 'toggleCodeBlock',
    description: 'toggle the code block',
  }],
  'orderedList': [{
    key: 'Mod-Shift-7',
    commandKey: 'toggleOrderedList',
    description: 'toggle an ordered list',
  }],
  'bulletList': [{
    key: 'Mod-Shift-8',
    commandKey: 'toggleBulletList',
    description: 'toggle a bullet list',
  }],
  'hardBreak': [{
    key: 'Mod-Shift-Enter',
    commandKey: 'setHardBreak',
    description: 'set hard break',
  }],
  'bold': [{
    key: 'Mod-b',
    commandKey: 'toggleBold',
    description: 'toggle the bold mark',
  }],
  'code': [{
    key: 'Mod-e',
    commandKey: 'toggleCode',
    description: 'toggle inline code mark',
  }],
  'italic': [{
    key: 'Mod-i',
    commandKey: 'toggleItalic',
    description: 'toggle the italic mark',
  }],
  'underline': [{
    key: 'Mod-u',
    commandKey: 'toggleUnderline',
    description: 'toggle an underline mark',
  }],
  // TODO: toggle link needs to wrap with custom ui to set href
  'link': [{
    key: 'Mod-l',
    commandKey: 'toggleLink',
    description: 'open toggle link modal',
  }],
  'strike': [{
    key: 'Mod-Shift-x',
    commandKey: 'toggleStrike',
    description: 'toggle Strike mark',
  }],
  'subscript': [{
    key: 'Mod-,',
    commandKey: 'toggleSubscript',
    description: 'toggle subscript mark',
  }],
  'superscript': [{
    key: 'Mod-.',
    commandKey: 'toggleSuperscript',
    description: 'toggle superscript mark',
  }],
  'highlight': [{
    key: 'Mod-Shift-h',
    commandKey: 'toggleHighlight',
    description: 'toggle a text highlight',
  }],
  // TODO: Is this needed?
  'color': [
    {
      key: 'Mod-Shift-e',
      commandKey: 'setColor',
      description: 'set font color',
    },
    {
      key: 'Mod-Shift-r',
      commandKey: 'unsetColor',
      description: 'removes any font color',
    },
  ],
  'history': [
    {
      key: 'Mod-z',
      commandKey: 'undo',
      description: 'undo the last change',
    },
    {
      key: 'Mod-Shift-z',
      commandKey: 'redo',
      description: 'redo the last change',
    },
  ],
  'textAlign': [
    {
      key: 'Mod-Shift-l',
      commandKey: 'setTextAlign',
      description: 'align text to left',
    },
    {
      key: 'Mod-Shift-e',
      commandKey: 'setTextAlign',
      description: 'align text to center',
    },
    {
      key: 'Mod-Shift-r',
      commandKey: 'setTextAlign',
      description: 'align text to right',
    },
    {
      key: 'Mod-Shift-j',
      commandKey: 'setTextAlign',
      description: 'align text justify',
    },
  ],
}
