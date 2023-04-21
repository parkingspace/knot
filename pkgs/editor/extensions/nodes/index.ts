// essential nodes that are required for the editor to work
import Document from '@tiptap/extension-document'
import ListItem from '@tiptap/extension-list-item'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

import Blockquote from './blockQuote'
import BulletList from './bulletList'
//  FIX: lowlight is not working
// import CodeBlock from './codeBlock'
import Heading from './heading'
import OrderedList from './orderedList'

export default [
  Document,
  Paragraph,
  Text,
  ListItem,
  Heading,
  Blockquote,
  // CodeBlock,
  OrderedList,
  BulletList,
]
