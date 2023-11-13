import type { Editor } from "@tiptap/core";
import type { Node } from "@tiptap/pm/model";

import Placeholder from "@tiptap/extension-placeholder";

// https://tiptap.dev/api/extensions/placeholder
export default Placeholder.configure({
  // The placeholder text added as data-placeholder attribute.
  placeholder: (props: {
    editor: Editor;
    node: Node;
    pos: number;
    hasAnchor: boolean;
  }) => {
    if (props.node.type.name === "heading") {
      if (props.pos === 0) {
        return "Untitled";
      }
      return `Heading ${props.node.attrs.level}`;
    }
    return "Start writing...";
  },
});
