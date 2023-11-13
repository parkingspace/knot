import Text from "@tiptap/extension-text";

import Blockquote from "./blockQuote";
import BulletList from "./bulletList";
import CodeBlock from "./codeBlock";
import Document from "./document";
import HardBreak from "./hardBreak";
import Heading from "./heading";
import ListItem from "./listItem";
import OrderedList from "./orderedList";
import Paragraph from "./paragraph";

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
];
