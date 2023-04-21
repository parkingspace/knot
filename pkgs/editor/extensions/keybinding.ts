// TODO: Make this file as single entry point as solid signal.

import { SingleCommands } from '@tiptap/core'

// Mod is a meta key,
// Command key on macOS
// Control key on Windows and Linux.

const essential = {
  'copy': {
    'key': 'Mod-c',
    'command': 'editor.action.clipboardCopyAction',
  },
  'cut': {
    'key': 'Mod-x',
    'command': 'editor.action.clipboardCutAction',
  },
  'paste': {
    'key': 'Mod-v',
    'command': 'editor.action.clipboardPasteAction',
  },
  'pasteWithoutFormatting': {
    'key': 'Mod-Shift-v',
    'command': 'editor.action.clipboardPasteAction',
  },
  'undo': {
    'key': 'Mod-z',
    'command': 'undo',
  },
  'redo': {
    'key': 'Mod-y',
    'command': 'redo',
  },
  'linebreak': {
    'key': 'Enter',
    'command': 'editor.action.insertLineAfter',
  },
}

const selection = {
  'selectAll': {
    'key': 'Mod-a',
    'command': 'editor.action.selectAll',
  },
  'selectNode': {
    'key': 'Shift-Enter',
    'command': 'editor.action.smartSelect.shrink',
  },
  'extendCharLeft': {
    'key': 'Shift-LeftArrow',
    'command': 'editor.action.smartSelect.grow',
  },
  'extendCharRight': {
    'key': 'Shift-RightArrow',
    'command': 'editor.action.smartSelect.grow',
  },
  'extendLineUp': {
    'key': 'Shift-UpArrow',
    'command': 'editor.action.smartSelect.grow',
  },
  'extendLineDown': {
    'key': 'Shift-DownArrow',
    'command': 'editor.action.smartSelect.grow',
  },
  'extendWordLeft': {
    'key': 'Shift-Alt-LeftArrow',
    'command': 'editor.action.smartSelect.grow',
  },
  'extendWordRight': {
    'key': 'Shift-Alt-RightArrow',
    'command': 'editor.action.smartSelect.grow',
  },
  'extendLineStart': {
    'key': 'Shift-Home',
    'command': 'editor.action.smartSelect.grow',
  },
  'extendLineEnd': {
    'key': 'Shift-End',
    'command': 'editor.action.smartSelect.grow',
  },
  'extendDocStart': {
    'key': 'Shift-PageUp',
    'command': 'editor.action.smartSelect.grow',
  },
  'extendDocEnd': {
    'key': 'Shift-PageDown',
    'command': 'editor.action.smartSelect.grow',
  },
}

const textFormatting = {
  'bold': {
    'key': 'Mod-b',
    'command': 'editor.action.formatDocument',
  },
  'italic': {
    'key': 'Mod-i',
    'command': 'editor.action.formatDocument',
  },
  'underline': {
    'key': 'Mod-u',
    'command': 'editor.action.formatDocument',
  },
  'strikethrough': {
    'key': 'Mod-Shift-s',
    'command': 'editor.action.formatDocument',
  },
  'highlight': {
    'key': 'Mod-Shift-h',
    'command': 'editor.action.formatDocument',
  },
  'code': {
    'key': 'Mod-Shift-c',
    'command': 'editor.action.formatDocument',
  },
}

const nodeFormatting = {
  'paragraph': {
    'key': 'Mod-0',
    'command': 'editor.action.formatDocument',
  },
  'heading1': {
    'key': 'Mod-1',
    'command': 'editor.action.formatDocument',
  },
  'heading2': {
    'key': 'Mod-2',
    'command': 'editor.action.formatDocument',
  },
  'heading3': {
    'key': 'Mod-3',
    'command': 'editor.action.formatDocument',
  },
  'heading4': {
    'key': 'Mod-4',
    'command': 'editor.action.formatDocument',
  },
  'heading5': {
    'key': 'Mod-5',
    'command': 'editor.action.formatDocument',
  },
  'heading6': {
    'key': 'Mod-6',
    'command': 'editor.action.formatDocument',
  },
  'orderedList': {
    'key': 'Mod-Shift-7',
    'command': 'editor.action.formatDocument',
  },
  'bulletList': {
    'key': 'Mod-Shift-8',
    'command': 'editor.action.formatDocument',
  },
  'taskList': {
    'key': 'Mod-Shift-9',
    'command': 'editor.action.formatDocument',
  },
  'blockquote': {
    'key': 'Mod-Shift-b',
    'command': 'editor.action.formatDocument',
  },
  'codeblock': {
    'key': 'Mod-Shift-c',
    'command': 'editor.action.formatDocument',
  },
  'leftAlign': {
    'key': 'Mod-Shift-l',
    'command': 'editor.action.formatDocument',
  },
  'centerAlign': {
    'key': 'Mod-Shift-e',
    'command': 'editor.action.formatDocument',
  },
  'rightAlign': {
    'key': 'Mod-Shift-r',
    'command': 'editor.action.formatDocument',
  },
  'justifyAlign': {
    'key': 'Mod-Shift-j',
    'command': 'editor.action.formatDocument',
  },
  'Subscript': {
    'key': 'Mod-Shift-,',
    'command': 'editor.action.formatDocument',
  },
  'Superscript': {
    'key': 'Mod-Shift-.',
    'command': 'editor.action.formatDocument',
  },
}

const bold = {
  'toggle': (commands: SingleCommands) => ({
    'Mod-b': () => commands.toggleBold(),
  }),
}

export { bold, essential, nodeFormatting, selection, textFormatting }
