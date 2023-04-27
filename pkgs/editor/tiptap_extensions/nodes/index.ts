// essential nodes that are required for the editor to work
import ListItem from '@tiptap/extension-list-item'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

import Blockquote from './blockQuote'
import BulletList from './bulletList'
import CodeBlock from './codeBlock'
import Document from './document'
import HardBreak from './hardBreak'
import Heading from './heading'
import OrderedList from './orderedList'

export default [
  Document,
  Paragraph,
  Text,
  ListItem,
  Heading,
  Blockquote,
  CodeBlock,
  OrderedList,
  BulletList,
  HardBreak,
]
