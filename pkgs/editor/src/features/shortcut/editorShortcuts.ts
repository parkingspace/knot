import type { Editor } from '@tiptap/core'

export function applyEditorShortcuts(that: any) {
  if (!editorShortcuts[that.name]) {
    return {}
  }

  const shortcuts: Record<string, (t: { editor: Editor }) => any> = {}

  for (const shortcut of editorShortcuts[that.name]) {
    shortcuts[shortcut.keys] = shortcut.command
  }

  return shortcuts
}

export interface EditorShortcuts {
  [key: string]: {
    keys: string
    command: (t: { editor: Editor }) => any
    description: string
  }[]
}

export const editorShortcuts: EditorShortcuts = {
  'paragraph': [{
    keys: 'Mod-Alt-0',
    command: (t) => t.editor.commands.setParagraph(),
    description: 'to paragraph',
  }],
  'listItem': [{
    keys: 'Enter',
    command: (t) => t.editor.commands.splitListItem('listItem'),
    description: 'split list item',
  }, {
    keys: 'Tab',
    command: t => t.editor.commands.sinkListItem('listItem'),
    description: 'sink list item',
  }, {
    keys: 'Shift-Tab',
    command: t => t.editor.commands.liftListItem('listItem'),
    description: 'lift list item',
  }],
  'heading': [{
    keys: 'Mod-Alt-1',
    command: t => t.editor.commands.toggleHeading({ level: 1 }),
    description: 'toggle heading 1',
  }, {
    keys: 'Mod-Alt-2',
    command: t => t.editor.commands.toggleHeading({ level: 2 }),
    description: 'toggle heading 2',
  }, {
    keys: 'Mod-Alt-3',
    command: t => t.editor.commands.toggleHeading({ level: 3 }),
    description: 'toggle heading 3',
  }],
  'blockquote': [{
    keys: 'Mod-Shift-b',
    command: t => t.editor.commands.toggleBlockquote(),
    description: 'toggle blockquote',
  }],
  'codeBlock': [{
    keys: 'Mod-Alt-c',
    command: t => t.editor.commands.toggleCodeBlock(),
    description: 'toggle code block',
  }],
  'orderedList': [{
    keys: 'Mod-Shift-7',
    command: t => t.editor.commands.toggleOrderedList(),
    description: 'toggle ordered list',
  }],
  'bulletList': [{
    keys: 'Mod-Shift-8',
    command: t => t.editor.commands.toggleBulletList(),
    description: 'toggle bullet list',
  }],
  'hardBreak': [{
    keys: 'Mod-Shift-Enter',
    command: t => t.editor.commands.setHardBreak(),
    description: 'set hard break',
  }],
  'bold': [{
    keys: 'Mod-b',
    command: t => t.editor.commands.toggleBold(),
    description: 'toggle bold',
  }],
  'code': [{
    keys: 'Mod-e',
    command: t => t.editor.commands.toggleCode(),
    description: 'toggle inline code',
  }],
  'italic': [{
    keys: 'Mod-i',
    command: t => t.editor.commands.toggleItalic(),
    description: 'toggle italic',
  }],
  'underline': [{
    keys: 'Mod-u',
    command: t => t.editor.commands.toggleUnderline(),
    description: 'toggle underline',
  }],
  // TODO: toggle link needs to wrap with custom ui to set href
  // 'link': [{
  //   keys: 'Mod-l',
  //   command: 'toggleLink',
  //   description: 'open toggle link modal',
  // }],
  'strike': [{
    keys: 'Mod-Shift-x',
    command: t => t.editor.commands.toggleStrike(),
    description: 'toggle strike',
  }],
  'subscript': [{
    keys: 'Mod-,',
    command: t => t.editor.commands.toggleSubscript(),
    description: 'toggle subscript',
  }],
  'superscript': [{
    keys: 'Mod-.',
    command: t => t.editor.commands.toggleSuperscript(),
    description: 'toggle superscript',
  }],
  'highlight': [{
    keys: 'Mod-Shift-h',
    command: t => t.editor.commands.toggleHighlight(),
    description: 'toggle highlight',
  }],
  'color': [
    {
      keys: 'Mod-Shift-e',
      command: t => {
        return t.editor.commands.setColor('#958DF1')
      },
      description: 'set font color',
    },
    {
      keys: 'Mod-Shift-r',
      command: t => t.editor.commands.unsetColor(),
      description: 'remove font color',
    },
  ],
  'history': [
    {
      keys: 'Mod-z',
      command: t => t.editor.commands.undo(),
      description: 'undo',
    },
    {
      keys: 'Mod-Shift-z',
      command: t => t.editor.commands.redo(),
      description: 'redo',
    },
  ],
  'textAlign': [
    {
      keys: 'Mod-Shift-h',
      command: t => t.editor.commands.setTextAlign('left'),
      description: 'align left',
    },
    {
      keys: 'Mod-Shift-;',
      command: t => t.editor.commands.setTextAlign('center'),
      description: 'align center',
    },
    {
      keys: 'Mod-Shift-l',
      command: t => t.editor.commands.setTextAlign('right'),
      description: 'align right',
    },
    {
      keys: 'Mod-Shift-k',
      command: t => t.editor.commands.setTextAlign('justify'),
      description: 'align justify',
    },
  ],
}
