import TextAlign from "@tiptap/extension-text-align";
import { applyEditorShortcuts } from "../../features/shortcut/editorShortcuts";

export default TextAlign
  .extend({
    addKeyboardShortcuts() {
      return applyEditorShortcuts(this);
    },
  })
  .configure({
    types: ["heading", "paragraph"],
  });
