import CodeBlock from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "lowlight";
import { applyEditorShortcuts } from "../../features/shortcut/editorShortcuts";

const codeBlock = CodeBlock
  .extend({
    addKeyboardShortcuts() {
      return applyEditorShortcuts(this);
    },
  })
  .configure({ lowlight: lowlight });

export default codeBlock;
