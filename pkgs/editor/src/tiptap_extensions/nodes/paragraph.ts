import Paragraph from "@tiptap/extension-paragraph";
import { applyEditorShortcuts } from "../../features/shortcut/editorShortcuts";

export default Paragraph
  .extend({
    addKeyboardShortcuts() {
      return applyEditorShortcuts(this);
    },
  });
